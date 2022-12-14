import React, {useState} from 'react';
import moment from "moment";
import styled from "styled-components";
import palette from "../../library/styles/palette";
import AskModal from "../Common/AskModal";

const EventList = styled.div`
  margin : 10px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border : 1px solid black;
  
  .birthday {
    background: ${palette.birth};
    width: 90%;
  }
  .vacation {
    background: ${palette.vaca};
    width: 90%;
  }
  .Event {
    background: ${palette.Event};
    width: 90%;
  }
  .others {
    background: ${palette.others};
    width: 90%;
  }
`;


//
function ArrayTestComp() {
    const title = "날짜 풀어서 배열화"
    const [dayPick, setDayPick] = useState('');
    const onChange= (e) => {
        setDayPick(e.target.value)
    }

    const events = [
        {
            cal_title: '문장혁',
            cal_start_day: '2022-10-16',
            cal_end_day: '2022-10-16',
            cal_category: 'birthday',
            cal_index: 1
        },
        {
            cal_title: 'OSD',
            cal_start_day: '2022-10-24',
            cal_end_day: '2022-10-28',
            cal_category: 'vacation',
            cal_index: 2
        },
        {
            cal_title: 'OSD1',
            cal_start_day: '2022-10-24',
            cal_end_day: '2022-10-24',
            cal_category: 'vacation',
            cal_index: 3
        },
        {
            cal_title: '캇테골히',
            cal_start_day: '2022-10-29',
            cal_end_day: '2022-11-04',
            cal_category: 'birthday',
            cal_index: 16
        },
        {
            cal_title: '막걸리데미지',
            cal_start_day: '2022-10-26',
            cal_end_day: '2022-10-28',
            cal_category: 'event',
            cal_index: 24
        },
        {
            cal_title: '삭제후다시',
            cal_start_day: '2022-10-27',
            cal_end_day: '2022-10-27',
            cal_category: 'event',
            cal_index: 26
        },
        {
            cal_title: '추가하기',
            cal_start_day: '2022-10-28',
            cal_end_day: '2022-10-28',
            cal_category: 'Event',
            cal_index: 29
        },
        {
            cal_title: 'API 보내기 성공',
            cal_start_day: '2022-10-28',
            cal_end_day: '2022-10-28',
            cal_category: 'Event',
            cal_index: 30
        },
        {
            cal_title: '첫 주말출근',
            cal_start_day: '2022-10-29',
            cal_end_day: '2022-10-28',
            cal_category: 'others',
            cal_index: 31
        },
        {
            cal_title: '파일옮기기',
            cal_start_day: '2022-10-28',
            cal_end_day: '2022-10-28',
            cal_category: 'others',
            cal_index: 41
        },
        {
            cal_title: '페이로드값확인',
            cal_start_day: '2022-10-28',
            cal_end_day: '2022-10-28',
            cal_category: 'Event',
            cal_index: 46
        },
        {
            cal_title: 'form이 편하네!',
            cal_start_day: '2022-10-28',
            cal_end_day: '2022-10-28',
            cal_category: 'Event',
            cal_index: 47
        }
    ]

    // 시작일자와 종료일자 사이의 날짜들을 풀어서 다시 리스트화
    const makeBetweenDates = ( EventList ) => {
        const newEventList = [];
        let keyValue = 0;
        EventList.map((oneEvent) => {
            let currentDate = moment(oneEvent.cal_start_day);
            let stopDate = moment(oneEvent.cal_end_day);
            while (currentDate <= stopDate) {
                newEventList.push({
                    title : oneEvent.cal_title,
                    category : oneEvent.cal_category,
                    date : moment(currentDate).format('YYYY-MM-DD'),
                    inputKey : keyValue
                })
                keyValue++;
                currentDate = moment(currentDate).add(1, "days");

            }
        })
        return newEventList
    }

    // 해당 날짜마다 전부 값을 넣어주기
    const PostEventsList = ( eventDate, newEventList ) => {
        let foundEvents =  newEventList.filter(e => e.date === eventDate);
        return foundEvents;
    }

    // 한 날짜의 이벤트 리스트를 나타내는 Function
    const [foundList, setFoundList] = useState([]);

    const newListAndPostEvent = ( eventDate, EventList ) => {
        const newEventList = [];
        let keyValue = 0;

        // 이벤트의 시작일자와 종료일자 사이에 해당하는 Event 들을 newEventList 배열에 다시 넣어주기.
        // 형태 => newEventList = [   { title : OSD행사 , category : Event , date : 2022-10-20, inputKey : 0 },
        //                           { title : 홍길동 , category : birthday , date : 2022-01-01, inputKey : 1 }, ... ]
        EventList.map((oneEvent) => {
            let currentDate = moment(oneEvent.cal_start_day);
            let stopDate = moment(oneEvent.cal_end_day);
            while (currentDate <= stopDate) {
                newEventList.push({
                    title: oneEvent.cal_title,
                    category: oneEvent.cal_category,
                    date: moment(currentDate).format('YYYY-MM-DD'),
                    inputKey: keyValue
                })
                keyValue++;
                currentDate = moment(currentDate).add(1, "days");
            }
        })
        let foundEvents = newEventList.filter(e => e.date === eventDate);
        setFoundList(foundEvents)
    }

    const tempList = [1,2,3,4,5,6,6];




    return (
        <div>
            <EventList>
                {['일', '월', '화', '수', '목', '금', '토'].map((day) => {
                    return (<div key={day} className="tableHead">{day}</div>)
                })}
                {
                    events.map((event) => {
                        return (
                            <div key={event.cal_index}>
                                <div className={event.cal_category}>{event.cal_title}</div>
                                <div>{event.cal_start_day}</div>
                            </div>
                        )
                    })
                }
            </EventList>
            <h2>{title},{typeof (title)}</h2>
            <EventList>
            {
                makeBetweenDates(events).map((oneEvent) => {
                    return(
                        <div key={oneEvent.inputKey}>
                            <div className={oneEvent.category}>{oneEvent.title}</div>
                            <div>{oneEvent.date}</div>
                        </div>
                    )})
            }
            </EventList>
            <h2>날짜값 받아서 해당 날짜의 데이터만 불러오기</h2>
            <div>
                <label>날짜 입력 :</label>
                <input type="date" value={dayPick} onChange={onChange}/>
                <span> 입력된 날짜 : </span>
                <span>{dayPick}</span>
                <button onClick={() => newListAndPostEvent(dayPick, events)}> 찾기 </button>
            </div>
            <EventList>
                { foundList.map((foundEvent) => {
                    return (
                        <div key={foundEvent.inputKey}>
                            <div className={foundEvent.category}>{foundEvent.title}</div>
                            <div>{foundEvent.date}</div>
                        </div>
                    )
                })}
            </EventList>
            <EventList>
                {
                    tempList.map((temp, idx) => {
                        return (
                            <div key={idx}>
                                {temp}
                            </div>
                        )
                    })
                }
            </EventList>
            <button>팝업 !</button>
            <AskModal
                visible={false}
            />
        </div>
    );
}

export default ArrayTestComp;


