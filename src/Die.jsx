export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? '#59E391' : ''
  };
  return (
    <button 
      className="btn btn-light d-flex justify-content-center align-items-center m-2"
      style={{ ...styles, width: '60px', height: '60px', fontSize: '1.5rem', borderRadius: '10px' }}
      onClick={props.onClickEvent}
      aria-pressed={props.isHeld}
      aria-label={`Die with value ${props.value}, ${props.isHeld ? "held" : "not held"}`}>
        {props.value}
    </button>
  );
}

