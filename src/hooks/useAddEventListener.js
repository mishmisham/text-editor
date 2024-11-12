
import { useEffect, useRef } from 'react'

export default function useAddEventListener( target, event, callback) {

    const ref = useRef(target);
    
    useEffect(() => {
        if (!target) {
            return;
        }

        ref.current.addEventListener(event, callback);
       
        return () => {
            ref.current.removeEventListener(event, callback);
        }
    }, [callback, event, target]);
}
