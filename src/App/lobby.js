import React from 'react';
import { SCREEN } from './constants';


function Lobby({ userName, setScreen, setUsername }) {
  return (
    <div style={{ width: '200px', height: '100px' }}>
      <input style={{ width: '100%' }} value={userName} onChange={(e) => setUsername(e.target.value)} />
      <button
        style={{
          marginTop: '24px',
          backgroundColor: 'black',
          color: 'white',
          width: '100%',
          height: '30px',
        }}
        type="submit"
        onClick={() => setScreen(SCREEN.PLAYING)}
      >
        START!
      </button>
    </div>
  );
}

export default Lobby;
