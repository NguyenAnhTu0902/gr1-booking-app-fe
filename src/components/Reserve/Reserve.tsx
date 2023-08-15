import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../context/SearchContext';
import useFetch from '../../hooks/useFetch';
import { Room } from '../../models/Room';
import styles from './Reserve.module.scss';

interface ReserveProps {
  setIsOpenBookingModal: (boolean) => void;
  hotelId: string;
}

const Reserve = ({ setIsOpenBookingModal, hotelId }: ReserveProps) => {
  const navigate = useNavigate();
  const [selectedRooms, setSelectedRooms] = useState<number[]>([]);
  const { data, error } = useFetch<Room[]>(
    `${process.env.REACT_APP_API_ENDPOINT}/hotels/room/${hotelId}`,
  );
  const { dates } = useContext(SearchContext);

  const getDatesInRage = (startDate, endDate) => {
    const date = new Date(startDate.getTime());
    const dateList: number[] = [];

    while (date <= endDate) {
      dateList.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dateList;
  };

  const allDates = getDatesInRage(dates[0].startDate, dates[0].endDate);

  // Check if a room is available or not
  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      allDates.includes(new Date(date).getTime()),
    );

    return !isFound;
  };

  const handleSelectRoom = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value),
    );
  };

  const handleReserve = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          axios.put(
            `${process.env.REACT_APP_API_ENDPOINT}/rooms/availability/${roomId}`,
            { dates: allDates },
          );
        }),
      );
      setIsOpenBookingModal(false);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className={styles['reserve']}>
      <div className={styles['reserve__container']}>
        <FontAwesomeIcon
          icon={faCircleXmark}
          className={styles['reserve__container__close-btn']}
          onClick={() => setIsOpenBookingModal(false)}
        />
        <span>Select your rooms</span>
        {data?.map((item, index) => (
          <div className={styles['reserve__container__item']} key={index}>
            <div className={styles['reserve__container__item__information']}>
              <div
                className={
                  styles['reserve__container__item__information__title']
                }
              >
                {item.title}
              </div>
              <div
                className={
                  styles['reserve__container__item__information__description']
                }
              >
                {item.description}
              </div>
              <div
                className={
                  styles['reserve__container__item__information__max-people']
                }
              >
                Max people: <b>{item.maxPeople}</b>
              </div>
              <div
                className={
                  styles['reserve__container__item__information__price']
                }
              >
                {item.price}
              </div>
            </div>
            <div className={styles['reserve__container__item__select']}>
              {item.roomNumbers.map((roomNumber, index) => (
                <div
                  className={styles['reserve__container__item__select__room']}
                  key={index}
                >
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={handleSelectRoom}
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button
          className={styles['reserve__container__btn']}
          onClick={handleReserve}
        >
          Reserve Now!
        </button>
      </div>
    </div>
  );
};

export default Reserve;