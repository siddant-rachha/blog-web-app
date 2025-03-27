/* eslint-disable @typescript-eslint/no-explicit-any */
const eventListenerMap = new Map<string, EventListener[]>();

// Add event listener and track reference
export const EventConsumer = (name: string, callback: (value: any) => void) => {
  // Define the event handler
  const handler: EventListener = (e) => {
    const event = e as CustomEvent;
    callback(event.detail);
  };

  // Add listener and store reference
  window.addEventListener(name, handler);

  if (!eventListenerMap.has(name)) {
    eventListenerMap.set(name, []);
  }
  eventListenerMap.get(name)?.push(handler);
};

// Remove all listeners for a given event name
export const RemoveEvent = (name: string) => {
  const listeners = eventListenerMap.get(name) || [];

  // Remove all registered handlers for this event name
  listeners.forEach((handler) => window.removeEventListener(name, handler));

  // Clean up the map
  eventListenerMap.delete(name);
};
