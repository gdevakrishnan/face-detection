import React, { Fragment, useContext, useEffect, useRef, useState } from 'react';
import { getCheckFaces, getRecognize, putAttendance } from '../services/serviceWorker';
import appContext from '../context/appContext';
import audio from "../assets/invite.mp3"

function Attendance() {
  const [face, setFace] = useState(false);
  const { setMsg } = useContext(appContext);
  const initialState = {
    "name": "-",
    "date": "-",
    "time": "-"
  };
  const [recognizedData, setRecognizedData] = useState(initialState);
  const audioRef = useRef(null); 

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await getCheckFaces();
        if (isMounted) {
          if (response.data.face_detected && response.status) {
            await getRecognize()
              .then(async (response) => {
                if (response.status) {
                  console.log(response.data);
                  setRecognizedData(response.data);
                  await putAttendance(response.data)
                    .then((response) => {
                      console.log(response);
                      if (audioRef.current) {
                        audioRef.current.play();
                      }
                      setMsg(response.data.message);
                      setTimeout(() => {
                        setMsg("")
                        setRecognizedData(initialState)
                      }, 2000);
                    })
                    .catch((e) => console.log(e.message));
                }
              })
              .catch((e) => console.log(e.message));
            setFace(true);
          } else {
            console.log("Not Detected");
            setFace(false);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setTimeout(fetchData, 15000);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Fragment>
      <section className="page attendancePage">
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <td>{recognizedData.name}</td>
            </tr>

            <tr>
              <th>Date</th>
              <td>{recognizedData.date}</td>
            </tr>

            <tr>
              <th>Time</th>
              <td>{recognizedData.time}</td>
            </tr>
          </tbody>
        </table>
        <audio ref={audioRef} src={audio} />

      </section>
    </Fragment>
  );
}

export default Attendance;
