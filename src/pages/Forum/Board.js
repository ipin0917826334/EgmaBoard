import React, { useState } from "react";

const Board = () => {
  const [topics, setTopics] = useState([]);

  const [newTopicName, setNewTopicName] = useState("");
  const [topicInputChk, setTopicInputChk] = useState(0);
  const [noteInputChk, setNoteInputChk] = useState(0);
  const [saveNoteChk, setSaveNoteChk] = useState(0);
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
      setTopicInputChk(1);
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

  const handleFileInputChange = (e, topicId) => {
    if (e.target.files && e.target.files[0]) {
      const fileReader = new FileReader();
      const fileType = e.target.files[0].type;
      fileReader.readAsDataURL(e.target.files[0]);
      fileReader.onload = () => {
        const fileContent = fileReader.result;
        addNote(topicId, fileContent, fileType);
      };
      // Clear the file input after adding the file
      e.target.value = "";
    };
  };

  const addNote = (topicId, content = "", type = "text/plain") => {
    const newTopics = [...topics];
    const topicIndex = newTopics.findIndex((topic) => topic.id === topicId);
    const newNote = {
      id: newTopics[topicIndex].notes.length + 1,
      content,
      type,
    };
    newTopics[topicIndex].notes.push(newNote);
    setTopics(newTopics);
    // setSaveNoteChk(1);
  };
  // const saveNote = () => {
  //   setNoteInputChk(1);
  // };


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
        <div className="topic-container justify-center gap-4">
          {topics.map((topic) => (
            <div key={topic.id} className="w-1/4 bg-gray-100 p-4 rounded">
              <div className="flex justify-between items-center mb-4 gap-4">
                {topicInputChk == 0 ? <input
                  className="border border-gray-400 p-2 w-full rounded"
                  type="text"
                  value={topic.name}
                  onChange={(e) =>
                    handleTopicNameChange(topic.id, e.target.value)
                  }
                /> : <h2 className="font-bold text-lg">เรื่อง: {topic.name}</h2>}
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
                    {note.type.startsWith("image/") ? (
                      <img
                        src={note.content}
                        alt="uploaded"
                        className="w-full rounded mt-3"
                      />
                    ) : (noteInputChk === 1 ?
                      <h2>{note.content}</h2>
                     :  <textarea
                     className="border border-gray-400 p-2 w-full rounded mt-3"
                     value={note.content}
                     onChange={(e) =>
                       updateNote(topic.id, note.id, e.target.value)
                     }
                   /> 
                    )}
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded float-right mt-2"
                      onClick={() => deleteNote(topic.id, note.id)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
                 <div className="flex gap-4">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                  onClick={() => addNote(topic.id)}
                >
                  Add Note
                </button>
                <label className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
                    Add Image
                    <input
                      className="hidden"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileInputChange(e, topic.id)}
                    />
                  </label>
                  {/* {saveNoteChk == 1 ? <button className="bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={saveNote}>Save</button>: null} */}
              </div>
              </div>
            </div>
          ))}
          <div className="w-1/4 bg-gray-100 p-4 rounded">
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