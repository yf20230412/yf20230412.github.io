const { Octokit } = require("@octokit/rest");
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

const owner = "yf20230412";
const repo = "yf20230412.github.io";

async function cleanupWorkflowRuns() {
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  const { data: workflowRuns } = await octokit.actions.listWorkflowRuns({
    owner,
    repo,
    status: "completed",
    created: `<=${oneDayAgo}`,
  });

  for (const run of workflowRuns.workflow_runs) {
    await octokit.actions.deleteWorkflowRun({
      owner,
      repo,
      run_id: run.id,
    });
    console.log(`Deleted workflow run ${run.id}`);
  }
}

cleanupWorkflowRuns().catch((err) => {
  console.error(err);
  process.exit(1);
});
