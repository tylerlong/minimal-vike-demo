export async function data() {
  await sleep(3000); // Simulate slow network
  return {
    greetings: "Hello, async data!",
  };
}

function sleep(milliseconds: number): Promise<void> {
  return new Promise((r) => setTimeout(r, milliseconds));
}
