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
      const filteredQueue = prevQueue.filter((queuedItem) => JSON.stringify(queuedItem) !== JSON.stringify(item));
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
      } catch {
        // do nothing if error
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

export default useActionQueue;
