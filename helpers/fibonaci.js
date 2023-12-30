exports.fibonaci = (num) => {
    let result = []
    for (let i = 0; i <= num; i++) {
        if (result.length < 2) {
            result.push(i)
        } else {
            let num = result[i - 1] + result[i - 2]
            result.push(num)
        }
    }

    return result
}