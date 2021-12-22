import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.post.createMany({
    data: [
      {
        title: "Post 1",
        content: "Hello world!",
      },
      {
        title: "Post 2",
        content: "Guten tag",
      },
      {
        title: "Lorem",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eget aliquet tellus. Sed convallis hendrerit lorem sit amet auctor. Phasellus vitae bibendum diam. Donec vitae egestas tortor. Suspendisse eget mi ultricies, dictum arcu sed, lobortis ipsum. Nunc non massa sit amet nulla cursus aliquet eu vitae augue. Vestibulum semper pellentesque interdum. Maecenas sem dolor, mattis non leo in, consectetur rutrum urna. Duis mattis dolor id leo volutpat efficitur. Vivamus laoreet neque volutpat neque egestas, tempus volutpat leo sollicitudin. Duis sed velit tellus. Vestibulum pretium enim a mauris auctor, consequat sollicitudin metus consectetur. In nec commodo enim, in egestas tellus. Vivamus faucibus odio dui, vel ullamcorper purus varius ut. Nunc est ipsum, porttitor non justo in, dapibus hendrerit libero. Morbi id laoreet nunc.",
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
