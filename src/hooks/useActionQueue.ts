import { useEffect, useRef, useState } from 'react';

// generic type for queue items
type QueueItem<T> = T;

// generic type for the action function
type ActionFunction<T> = (item: QueueItem<T>) => Promise<void>;

/**
 * Holds items to be processed in a queue.
 *
 * @param action action to perform on items
 * @param delay delay in milliseconds before performing action
 */
const useActionQueue = <T>(action: ActionFunction<T>, delay: number = 300) => {
  const [queue, setQueue] = useState<QueueItem<T>[]>([]);
  const isProcessing = useRef(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Adds an item to the queue.
   *
   * @param item item to add to queue
   */
  const addToQueue = (item: QueueItem<T>) => {
    setQueue((prevQueue) => {
      const filteredQueue = prevQueue.filter(
        (queuedItem) => JSON.stringify(queuedItem) !== JSON.stringify(item)
      );
      return [...filteredQueue, item];
    });
  };

  useEffect(() => {
    const processQueue = async () => {
      if (isProcessing.current || queue.length === 0) return;

      isProcessing.current = true;

      const [currentAction, ...remainingQueue] = queue;

      try {
        await action(currentAction);
      } catch (error) {
      }

      setQueue(remainingQueue);
      isProcessing.current = false;

      // clear the timer once the action completes
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };

    if (queue.length > 0 && !timerRef.current) {
      // debounce before processing the queue
      timerRef.current = setTimeout(() => {
        processQueue();
      }, delay);
    }
  }, [queue, action, delay]);

  return addToQueue;
};

// todo: use lodash? move into utils file?
const deepEqual = (obj1: any, obj2: any): boolean => {
  if (obj1 === obj2) return true;

  if (
    typeof obj1 !== 'object' ||
    obj1 === null ||
    typeof obj2 !== 'object' ||
    obj2 === null
  ) {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
};

export default useActionQueue;
