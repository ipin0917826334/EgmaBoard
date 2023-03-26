import React, { useState } from "react";

const Board = () => {
  const [topics, setTopics] = useState([
  ]);

  const [newTopicName, setNewTopicName] = useState("");

  const handleNewTopicNameChange = (e) => {
    setNewTopicName(e.target.value);
  };

  const addTopic = () => {
    if (newTopicName) {
      const newTopic = {
        id: topics.length + 1,
        name: newTopicName,
        notes: [],
      };
      setTopics([...topics, newTopic]);
      setNewTopicName("");
    }
  };

  const deleteTopic = (topicId) => {
    const newTopics = topics.filter((topic) => topic.id !== topicId);
    setTopics(newTopics);
  };

  const handleTopicNameChange = (topicId, newName) => {
    const newTopics = [...topics];
    const topicIndex = newTopics.findIndex((topic) => topic.id === topicId);
    newTopics[topicIndex].name = newName;
    setTopics(newTopics);
  };

  const addNote = (topicId) => {
    const newTopics = [...topics];
    const topicIndex = newTopics.findIndex((topic) => topic.id === topicId);
    const newNote = { id: newTopics[topicIndex].notes.length + 1, content: "" };
    newTopics[topicIndex].notes.push(newNote);
    setTopics(newTopics);
  };

  const deleteNote = (topicId, noteId) => {
    const newTopics = [...topics];
    const topicIndex = newTopics.findIndex((topic) => topic.id === topicId);
    newTopics[topicIndex].notes = newTopics[topicIndex].notes.filter(
      (note) => note.id !== noteId
    );
    setTopics(newTopics);
  };

  const updateNote = (topicId, noteId, content) => {
    const newTopics = [...topics];
    const topicIndex = newTopics.findIndex((topic) => topic.id === topicId);
    const noteIndex = newTopics[topicIndex].notes.findIndex(
      (note) => note.id === noteId
    );
    newTopics[topicIndex].notes[noteIndex].content = content;
    setTopics(newTopics);
  };

  return (
    <div className="items-start">
      <div className="px-4">
        <div className="flex justify-between items-center my-4">
          <h1 className="text-2xl font-bold">Board Title</h1>
        </div>
        <div className="flex gap-4">
          {topics.map((topic) => (
            <div key={topic.id} className="w-1/3 bg-gray-100 p-4 rounded">
              <div className="flex justify-between items-center mb-4 gap-4">
                <input
                  className="border border-gray-400 p-2 w-full rounded"
                  type="text"
                  value={topic.name}
                  onChange={(e) =>
                    handleTopicNameChange(topic.id, e.target.value)
                  }
                />
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => deleteTopic(topic.id)}
                >
                  Delete
                </button>
              </div>
              <div>
                {topic.notes.map((note) => (
                  <div key={note.id} className="mb-2">
                    <textarea
                      className="border border-gray-400 p-2 w-full rounded mt-3"
                      value={note.content}
                      onChange={(e) =>
                        updateNote(
                          topic.id,
                          note.id,
                          e.target.value
                        )
                      }
                    />
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded float-right mt-2"
                      onClick={() => deleteNote(topic.id, note.id)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => addNote(topic.id)}
                >
                  Add Note
                </button>
              </div>
            </div>
          ))}
          <div className="w-1/3 bg-gray-100 p-4 rounded">
            <div className="flex justify-between items-center mb-4 gap-4">
              <input
                className="border border-gray-400 p-2 w-full rounded"
                type="text"
                value={newTopicName}
                onChange={handleNewTopicNameChange}
              />
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={addTopic}
              >
                Add Topic
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;