const { Octokit } = require("@octokit/rest");
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

const owner = "yf20230412";
const repo = "yf20230412.github.io";

async function cleanupWorkflowRuns() {
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  // 获取所有已完成的工作流运行记录
  const { data: workflowRuns } = await octokit.actions.listWorkflowRuns({
    owner,
    repo,
    status: "completed",
    created: `<=${oneDayAgo}`,
    per_page: 100, // 每页获取的记录数
  });

  // 删除超过1天的运行记录
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
  console.error("Error during cleanup:", err);
  process.exit(1);
});
