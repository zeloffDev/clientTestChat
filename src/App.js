import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io.connect("http://localhost:3001");
function App() {
  const [state, setState] = useState();
  const handleJoinRoom = (id = 1) => {
    console.log(id);
    socket.emit("join_room", id);
  };

  const handleSendMassage = () => {
    const massage = {
      id: 1,
      message: `Hello test socket ${Math.random()}`,
    };
    socket.emit("send_massage", massage);
  };

  useEffect(() => {
    socket.on("receive_massage", (massage) => {
      console.log("receive_massage", massage);
      setState(massage);
    });
  }, [socket]);
  return (
    <div className="App">
      <button onClick={() => handleJoinRoom()}>Join Room</button>
      <button onClick={() => handleSendMassage()}>Send Massage</button>

      <p>Socket: {state?.message}</p>
    </div>
  );
}

export default App;
