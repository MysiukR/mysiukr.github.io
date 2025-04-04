let gitState = {
    isRepoInitialized: false,
    isBranchCreated: false,
    isBranchCheckedOut: false,
    isStaged: false,
    isCommitted: false,
    isMergeReady: false,
    isRemoteAdded: false,
    branches: { main: [] },
    currentBranch: "main",
    commitCount: 0,
    stagingArea: false,
    merges: []
};

const gitResponses = {
    "git init": "Initialized empty Git repository in /your-directory/.git",
    "git add .": "Added all files to staging area.",
    "git remote add origin https://github.com/user/repo.git": "Remote 'origin' added.",
    "git push origin main": "Pushing commits to 'main' branch on remote 'origin'...",
    "git pull origin main": "Pulling latest changes from 'main' branch..."
};

function updateGraph() {
    let svg = d3.select("#git-svg");
    svg.selectAll("*").remove();

    let branches = Object.keys(gitState.branches);
    let branchSpacing = 50;
    let commitSpacing = 80;

    let branchPositions = {}; 

    branches.forEach((branch, index) => {
        let y = 50 + index * branchSpacing;
        branchPositions[branch] = y;
        let commits = gitState.branches[branch];

        if (commits.length > 1) {
            for (let i = 0; i < commits.length - 1; i++) {
                svg.append("line")
                    .attr("x1", 50 + i * commitSpacing)
                    .attr("y1", y)
                    .attr("x2", 50 + (i + 1) * commitSpacing)
                    .attr("y2", y)
                    .attr("stroke", branch === "main" ? "white" : "red")
                    .attr("stroke-width", 2);
            }
        }

        commits.forEach((commit, i) => {
            svg.append("circle")
                .attr("cx", 50 + i * commitSpacing)
                .attr("cy", y)
                .attr("r", 10)
                .attr("fill", branch === "main" ? "white" : "red");

            svg.append("text")
                .attr("x", 50 + i * commitSpacing)
                .attr("y", y - 15)
                .attr("text-anchor", "middle")
                .attr("fill", "white")
                .text(commit);
        });

        svg.append("text")
            .attr("x", 10)
            .attr("y", y + 5)
            .attr("fill", "white")
            .text(branch);
    });

    gitState.merges.forEach(({ from, to }) => {
        let fromY = branchPositions[from];
        let toY = branchPositions[to];
        let toCommits = gitState.branches[to];
        let toX = 50 + (toCommits.length - 1) * commitSpacing;

        svg.append("line")
            .attr("x1", toX)
            .attr("y1", fromY)
            .attr("x2", toX)
            .attr("y2", toY)
            .attr("stroke", "yellow")
            .attr("stroke-width", 2)
            .attr("stroke-dasharray", "5,5");
    });
}

function runGitCommand() {
    let inputField = document.getElementById("git-input");
    let outputField = document.getElementById("terminal-output");
    let command = inputField.value.trim();
    if (command === "") return;
    let response = "Error: Unknown Git command!";
    let parts = command.split(" ");

    // Add current branch in parentheses after the $ sign
    let prompt = `<span>$</span> (${gitState.currentBranch})`;

    switch (command) {
        case "git init":
            if (!gitState.isRepoInitialized) {
                response = gitResponses["git init"];
                gitState.isRepoInitialized = true;
                gitState.branches = { main: [] };
                gitState.currentBranch = "main";
                gitState.commitCount = 0;
                gitState.stagingArea = false;
                gitState.merges = [];
            } else {
                response = "Error: Git repository is already initialized.";
            }
            break;
        case "git add .":
            if (!gitState.isRepoInitialized) {
                response = "Error: No git repository initialized.";
            } else {
                gitState.stagingArea = true;
                response = gitResponses["git add ."];
            }
            break;
        case (command.match(/^git commit -m ".*"$/)?.input):
            if (!gitState.isRepoInitialized) {
                response = "Error: No git repository initialized.";
            } else if (!gitState.stagingArea) {
                response = "Error: No changes staged. Use 'git add .' first.";
            } else {
                gitState.commitCount++;
                gitState.branches[gitState.currentBranch].push(`C${gitState.commitCount}`);
                gitState.stagingArea = false;
                response = `[${gitState.currentBranch}] ${command.match(/^git commit -m "(.*)"$/)[1]}\n1 file changed, 1 insertion(+)`;
            }
            break;
        case command.match(/^git branch (.*)$/)?.input:
            let branchName = command.match(/^git branch (.*)$/)[1];
            if (!gitState.isRepoInitialized) {
                response = "Error: No git repository initialized.";
            } else if (gitState.branches[branchName]) {
                response = `Error: Branch '${branchName}' already exists.`;
            } else {
                gitState.branches[branchName] = [...gitState.branches[gitState.currentBranch]];
                response = `Created branch '${branchName}'`;
            }
            break;
        case command.match(/^git checkout (.*)$/)?.input:
            let checkoutBranch = command.match(/^git checkout (.*)$/)[1];
            if (!gitState.isRepoInitialized) {
                response = "Error: No git repository initialized.";
            } else if (!gitState.branches[checkoutBranch]) {
                response = `Error: Branch '${checkoutBranch}' does not exist.`;
            } else {
                gitState.currentBranch = checkoutBranch;
                response = `Switched to branch '${checkoutBranch}'`;
            }
            break;
        case command.match(/^git merge (.*)$/)?.input:
            let mergeBranch = command.match(/^git merge (.*)$/)[1];
            if (!gitState.isRepoInitialized) {
                response = "Error: No git repository initialized.";
            } else if (!gitState.branches[mergeBranch]) {
                response = `Error: Branch '${mergeBranch}' does not exist.`;
            } else if (gitState.currentBranch === mergeBranch) {
                response = "Error: Cannot merge a branch into itself.";
            } else {
                gitState.branches[gitState.currentBranch] = [
                    ...gitState.branches[gitState.currentBranch],
                    ...gitState.branches[mergeBranch]
                ];
                gitState.merges.push({ from: mergeBranch, to: gitState.currentBranch });
                response = `Merged '${mergeBranch}' branch into '${gitState.currentBranch}'.`;
            }
            break;
        default:
            response = "Error: Unknown Git command!";
            break;
    }

    outputField.innerHTML += `${prompt} ${command}\n${response}<br>`;
    inputField.value = "";
    outputField.scrollTop = outputField.scrollHeight;

    updateGraph();
}

document.getElementById("git-input").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        runGitCommand();
    }
});

updateGraph();
