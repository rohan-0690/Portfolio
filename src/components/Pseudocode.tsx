import './Pseudocode.css';

interface PseudocodeModalProps {
  project: string;
  onClose: () => void;
}

const pseudocodeData: Record<string, string> = {
  'ARIA': `// ARIA - JARVIS-like AI Assistant

INITIALIZE system:
  LOAD voice_recognition_engine
  LOAD natural_language_processor
  LOAD response_generator
  SET listening_mode = true

FUNCTION listen_for_command():
  WHILE listening_mode:
    audio_input = CAPTURE_MICROPHONE()
    IF audio_input DETECTED:
      text = CONVERT_SPEECH_TO_TEXT(audio_input)
      PROCESS_COMMAND(text)

FUNCTION process_command(text):
  intent = NLP_ANALYZE(text)
  entities = EXTRACT_ENTITIES(text)
  
  SWITCH intent:
    CASE "search":
      result = SEARCH_WEB(entities)
      SPEAK(result)
    CASE "automation":
      EXECUTE_TASK(entities)
      SPEAK("Task completed")
    CASE "question":
      answer = GENERATE_RESPONSE(text)
      SPEAK(answer)
    DEFAULT:
      SPEAK("I didn't understand that")

FUNCTION speak(text):
  audio = TEXT_TO_SPEECH(text)
  PLAY_AUDIO(audio)

START_SYSTEM()`,

  'Band Studio': `// Band Studio - Music Production Platform

INITIALIZE audio_context:
  SET sample_rate = 44100
  CREATE audio_nodes
  SETUP recording_buffer

FUNCTION record_voice():
  REQUEST microphone_permission
  IF permission_granted:
    stream = GET_AUDIO_STREAM()
    recorder = CREATE_RECORDER(stream)
    
    ON record_button_click:
      recorder.START()
      UPDATE_UI("Recording...")
    
    ON stop_button_click:
      recorder.STOP()
      audio_blob = recorder.GET_DATA()
      SAVE_TO_TRACK(audio_blob)

FUNCTION drum_machine():
  DEFINE patterns = [kick, snare, hihat, clap]
  DEFINE grid = 16_steps
  
  FOR EACH step IN grid:
    IF pattern[step] IS_ACTIVE:
      SCHEDULE_SOUND(step, pattern)
  
  ON play_button:
    START_SEQUENCER()
    LOOP_PATTERN()

FUNCTION audio_editor():
  track = LOAD_AUDIO_FILE()
  
  APPLY_EFFECTS:
    - EQUALIZER(frequencies)
    - COMPRESSOR(threshold, ratio)
    - REVERB(room_size, decay)
    - DELAY(time, feedback)
  
  FUNCTION trim_audio(start, end):
    trimmed = track.SLICE(start, end)
    RETURN trimmed
  
  FUNCTION mix_tracks(tracks[]):
    mixed = CREATE_EMPTY_BUFFER()
    FOR EACH track IN tracks:
      mixed = ADD_AUDIO(mixed, track)
    RETURN mixed

EXPORT_PROJECT(format = "wav")`,

  'AttendEase': `// AttendEase - Employee Attendance System

INITIALIZE app:
  AUTHENTICATE_USER()
  GET_USER_LOCATION()
  CONNECT_TO_DATABASE()

FUNCTION check_in():
  current_location = GET_GPS_COORDINATES()
  current_time = GET_TIMESTAMP()
  employee_id = GET_USER_ID()
  
  IF VERIFY_LOCATION(current_location):
    attendance_record = {
      employee_id: employee_id,
      check_in_time: current_time,
      location: current_location,
      status: "present"
    }
    
    SAVE_TO_DATABASE(attendance_record)
    SEND_NOTIFICATION("Check-in successful")
  ELSE:
    SHOW_ERROR("Location verification failed")

FUNCTION verify_location(location):
  office_locations = GET_ALLOWED_LOCATIONS()
  
  FOR EACH office IN office_locations:
    distance = CALCULATE_DISTANCE(location, office)
    IF distance < ALLOWED_RADIUS:
      RETURN true
  
  RETURN false

FUNCTION track_employee():
  employee_data = FETCH_EMPLOYEE_RECORDS()
  
  DISPLAY_DASHBOARD:
    - SHOW_ACTIVE_EMPLOYEES()
    - SHOW_LOCATION_MAP()
    - SHOW_ATTENDANCE_STATS()
    - GENERATE_REPORTS()

FUNCTION generate_report(start_date, end_date):
  records = QUERY_DATABASE(start_date, end_date)
  
  CALCULATE:
    total_days = COUNT_WORKING_DAYS()
    present_days = COUNT_PRESENT_DAYS(records)
    attendance_rate = (present_days / total_days) * 100
  
  EXPORT_REPORT(format = "PDF")

START_APP()`
};

export default function Pseudocode({ project, onClose }: PseudocodeModalProps) {
  return (
    <div className="pseudocode-modal" onClick={onClose}>
      <div className="pseudocode-content" onClick={(e) => e.stopPropagation()}>
        <div className="pseudocode-header">
          <h3>{project} - Pseudocode</h3>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        <pre className="pseudocode-block">
          <code>{pseudocodeData[project] || 'No pseudocode available'}</code>
        </pre>
      </div>
    </div>
  );
}
