// Purpose: Handle analytics data storage (in-memory for now)

let events = [];

export const saveEvent = (event) => {
  const newEvent = {
    id: Date.now(),
    ...event,
  };

  events.push(newEvent);
  return newEvent;
};

export const getEvents = () => events;