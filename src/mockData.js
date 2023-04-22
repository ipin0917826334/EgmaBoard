export const mockTopics = [
    {
      id: 1,
      title: "React vs Angular",
      description: "Discussing the pros and cons of React and Angular.",
      likes: 3,
      dislikes: 1,
      posts: [
        {
          id: "1",
          author: "John Doe",
          content: "I prefer React because it's more flexible and has a larger community.",
          likes: 3,
          dislikes: 1,
          imgProfile: "https://thethaiger.com/th/wp-content/uploads/2021/05/42543884_2162764687331843_6703748344742674432_n-1.jpg"
        },
        {
            id: "2",
            author: "รักนะ",
            content: "ไอสัส",
            likes: 56,
            dislikes: 2,
            imgProfile: "https://image.bangkokbiznews.com/uploads/images/contents/w1024/2022/04/rYXZmTI2AnqH7xTPvndM.webp"
        },
      ],
      name: "พี่บ่าว"
    },
  ];
  export function addNewTopic(topic) {
    const newId = Math.max(...mockTopics.map((t) => t.id)) + 1;
    const newTopic = { ...topic, id: newId, posts: [] };
    mockTopics.push(newTopic);
    console.log(newTopic);
    return newTopic;
  }
  