import React from 'react'
import checkPrice from './checkPrice'

const checkTotalPrice = (arr) => {
    let totalPrice = 0;
    arr.map((num) => {
        totalPrice = totalPrice + parseInt(checkPrice(num.toString()))
       
    })

    return totalPrice;
}

export default checkTotalPrice
