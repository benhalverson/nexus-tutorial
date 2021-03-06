import { createTestContext } from './__helpers';
const ctx = createTestContext();

it('ensures that a draft can be created and published', async () => {
  // Create a new draft
  const draftResult = await ctx.client.request(`
    mutation {
      createDraft(title: "Nexus", body: "...") {
        id
        title
        body
        published
      }
    }
  `);
  expect(draftResult).toMatchSnapshot();

  // publish the draft
  const publishResult = await ctx.client.request(
    `
    mutation publishDraft($draftId: Int!) {
      publish(draftId: $draftId) {
        id
        title
        body
        published
      }
    }
  `,
    { draftId: draftResult.createDraft.id }
  );

  expect(publishResult).toMatchSnapshot();

  const persistedData = await ctx.db.post.findMany();
  expect(persistedData).toMatchSnapshot();
});
