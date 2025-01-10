import waitFor from "wait-for-async";

export async function data() {
  await waitFor({ interval: 1000 });
  return {
    greetings: "Hello, async data!",
  };
}
