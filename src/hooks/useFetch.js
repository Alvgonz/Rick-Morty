import { useState } from "react";
import axios from "axios";

import React from 'react'

const useFetch = (url) => {
        const [data, setData] = useState();
        const [error, setError] = useState(false);
        const [loading, setLoading] = useState(true);
    
        const getData = () => {
          axios.get(url)
            .then(res => {
                setData(res.data)
                setError(false)
            })
            .catch(err => {
                console.error(err)
                setError(true)
            })
            .finally( () => {
                setLoading(false)
            })
        };
        
    return  [data, getData,loading,  error]
  
}

export default useFetch


