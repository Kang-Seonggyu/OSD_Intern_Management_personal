import moment from 'moment';
import palette from "../../library/styles/palette";
import styled from "styled-components";
import React, {useEffect, useState} from "react";

const CalTotalBlock = styled.div`
  width: 100%;
  min-width: 650px;
  height: 90%;
  margin: 1px;
  display: grid;
  align-items: center;
  justify-items: center;
`

const CalendarBlock = styled.div`
  width: 95vw;
  min-width: 640px;
  height: 72vh;
  min-height: 600px;
`
const CalendarIndex = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 8px;
  height: 30px;
  .birthday {
    background: ${palette.birth};
  }
  .holiday {
    background: ${palette.holi};
  }
  .vacation {
    background: ${palette.vaca};
  }
  .Event {
    background: ${palette.Event};
  }
  .others {
    background: ${palette.others};
  }
`
const IndexingBar = styled.div`
  margin: 7px;
  width: 5vw;
  max-width: 50px ;
  height: 3vh;
  min-height: 15px;
  max-height: 25px;
  font-size: 2vh;
`;
const CalendarControllerBlock = styled.div`
  display: grid;
  grid-template-columns: 50px 30px 1fr 30px 50px;
  width: 95vw;
  min-width: 640px;
  height: 60px;
  margin-top : 10px;
  align-items: center;
  justify-items: center;
`
const Spacer = styled.div`
`
const ControlButton = styled.button`
  border: none;
  font-size: 15px;
  text-align: center;
  cursor: pointer;
`
const CalendarBox = styled.div`
  margin: 2px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 1px;
  text-align: center;
  .today {
    background: #c8ffc8;
  }
`
const TableHead = styled.div`
  background: lightgreen;
`
const TableBody = styled.div`
  background: white;
  display: flex;
  flex-direction: column;
  grid-auto-rows: minmax(10rem, auto);
  min-width: 30px;
  max-width: 100%;
  height: auto;
  min-height: 90px;
  padding-left : 4px;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;

  .date {
    padding-left: 5px;
  }

  .sunday {
    color: red;
  }
  .anotherMonth {
    color: lightgray !important;
  }
  .holiday {
    color: red;
    background: ${palette.holi};
    border-radius: 7px;
  }
  .birthday {
    background: ${palette.birth};
    width: 90%;
    border-radius: 7px;
  }
  .vacation {
    background: ${palette.vaca};
    width: 90%;
    border-radius: 7px;
  }
  .Event {
    background: ${palette.Event};
    width: 90%;
    border-radius: 7px;
  }
  .others {
    background: ${palette.others};
    width: 90%;
    border-radius: 7px;
  }
`
const EventDiv = styled.div`
  padding-left: 3px;
  cursor: pointer;
  :hover{
    filter: brightness(85%);
  }
`

function Calendar ({
                       AddEventClick,
                       onReload,
                       momentValue,
                       monthDecreaseButton,
                       monthIncreaseButton,
                       yearDecreaseButton,
                       yearIncreaseButton,
                       loadingHoliday,
                       Holidays,
                       loadingEvents,
                       newVacationList,
                       loadingVacation,
                       newEventList,
                       onEventClick,
                       onVacationClick,
                   }) {


    // ???????????? ????????? ???
    const firstWeek = momentValue.clone().startOf('month').week();
    // ???????????? ????????? ??? (?????? ????????? ?????? 1??? ???????????? 53?????? ?????? ??????)
    const lastWeek = momentValue.clone().endOf('month').week() === 1? 53 : momentValue.clone().endOf('month').week();

    const calendarArr=()=> {
        // ????????? ????????? ????????????. (???????????????)
        // ?????? : { '2022-10-03' : '?????????' }
        let holidaylist = {};
        if(!loadingHoliday && Holidays){
            Holidays.forEach((holiday) => {

                let holiday_year = holiday.locdate.toString().substring(0,4);
                let holiday_month = holiday.locdate.toString().substring(4,6).padStart(2,0);
                let holiday_day = holiday.locdate.toString().substring(6,8).padStart(2,0);

                let holiday_ID = `Date-${holiday_year}-${holiday_month}-${holiday_day}`;
                holidaylist[holiday_ID] = holiday.dateName;
            })
        }

        // ?????? ????????? ??????
        let result = [];
        let week = firstWeek;

        for (week; week <= lastWeek; week++) {
            // day = [ ???,???,???,???,???,???,??? ]
            for (let day = 0; day < 7; day++) {
                let currentMoment = momentValue.clone().startOf('year').week(week).startOf('week').add(day, 'day'); // 'D' ?????????????????? ?????????
                let date = currentMoment.format('YYYY-MM-DD')
                let dateID = `Date-${date}`

                // ?????? ????????? class ??? ???????????? ????????????.
                let todayCheck = currentMoment.format('YYYYMMDD') === moment().format('YYYYMMDD')  ? 'Today' : 'week';
                let dayCheck = day === 0 ? 'sunday' : todayCheck;

                // ???????????? ??????
                if (currentMoment.format('MM') === momentValue.format('MM')) {
                    if (dateID in holidaylist) {
                        result.push(PushTag(currentMoment, dateID, dayCheck, holidaylist[dateID]));
                    } else {
                        result.push(PushTag(currentMoment, dateID, dayCheck, ''));
                    }
                    // ???????????? ?????? ??????
                } else {
                    result.push(PushTag(currentMoment, dateID,"anotherMonth",''));
                }
            }
        }
        return result;
    }

    // currentMoment  : ?????? ????????? ????????????
    // dateID         : ???????????? ?????? ID ???
    // dayClass       : ?????? ????????? ?????? ( Today, week, sunday, anotherMonth )
    // Holiday        : ????????? ??????
    const PushTag = (currentMoment, dateID, dayClass, HolidayTitle) => {
        const today = currentMoment.format('YYYYMMDD') === moment().format('YYYYMMDD');

        return (
            <TableBody id={dateID} key={currentMoment.format('MM-DD')} className={`${today ? 'today' : ''}`}>
                <span>
                    <span className={HolidayTitle === ''? `date ${dayClass}`: `date sunday`}>
                        {currentMoment.format('D')}
                    </span>
                    <span className="holiday">
                        {HolidayTitle}
                    </span>
                </span>
                {!loadingVacation && dayClass !=="anotherMonth" ?
                    <EventDiv
                        onClick={onVacationClick}
                        id={currentMoment.format('YYYY-MM-DD')}
                        className="vacation" title="???????????????"
                    >
                        {oneDayData(currentMoment.format('YYYY-MM-DD'))}
                    </EventDiv>
                    :
                    ''
                }
                {!loadingEvents && dayClass!=="anotherMonth" ?
                    PostEventsList(currentMoment.format('YYYY-MM-DD') ,newEventList).map((foundEvent) => {
                        return (
                            <EventDiv
                                key={foundEvent.inputKey}
                                title="????????? ????????????"
                                id={foundEvent.inputKey}
                                onClick={onEventClick}
                                className={foundEvent.category}
                            >
                                {foundEvent.title}
                            </EventDiv>
                        )})
                    :
                    '' // ?????? ?????? ?????? ????????? ???????????? ??????.
                }
            </TableBody>
        )
    }

    const PostEventsList = ( eventDate, newEventList ) => {
        let foundEvents =  newEventList.filter(e => e.date === eventDate);
        return foundEvents;
    }

    const oneDayData = (eventDate) => {
        if(!loadingVacation && newVacationList){
            const oneDayFilter = newVacationList.filter(e => e.date === eventDate)
            if(oneDayFilter.length > 1 ) {
                return `${oneDayFilter[0].title}??? ${oneDayFilter.length-1}???`
            }
            else if (oneDayFilter.length === 1) {
                return oneDayFilter[0].title
            }
            else { return ''}
        }
    }


    return(
        <div>
            <CalTotalBlock>
                <CalendarControllerBlock>
                    <button title="????????????" onClick={onReload}><i className="fas fa-redo fa-fw me-1" /></button>
                    <Spacer style={{gridColumn:"2/4",gridRow : "1"}}></Spacer>
                    <button style={{gridColumn:"4/6",gridRow : "1"}} onClick={AddEventClick}>????????????</button>
                    <ControlButton title="1??????" onClick={yearDecreaseButton}>??</ControlButton>
                    <ControlButton title="1??????" onClick={monthDecreaseButton}>???</ControlButton>
                    <span style={{gridColumn:"3", fontSize:"25px"}}>{momentValue.format('YYYY ??? MM ???')}</span>
                    <ControlButton title="1??????"  onClick={monthIncreaseButton}>???</ControlButton>
                    <ControlButton title="1??????"  onClick={yearIncreaseButton}>??</ControlButton>
                </CalendarControllerBlock>
                <CalendarBlock>
                    <CalendarIndex>
                        <IndexingBar title="birthday" className="birthday"/>??????
                        <IndexingBar title="holiday" className="holiday"/>?????????
                        <IndexingBar title="event" className="Event"/>??????
                        <IndexingBar title="vacation" className="vacation"/>??????
                        <IndexingBar title="others" className="others"/>??????
                    </CalendarIndex>
                    <CalendarBox>
                        { ['???','???','???','???','???','???','???'].map((day) => {
                            return( <TableHead key={day} title={`${day}??????`} className="tableHead">{day}</TableHead> )
                        })}
                        {calendarArr()}
                    </CalendarBox>
                </CalendarBlock>
            </CalTotalBlock>
        </div>
    )
}

export default Calendar;