let myArray = [
    { 'name': 'Michael', 'age': '30', 'birthdate': '11/10/1989' },
    { 'name': 'Mila', 'age': '32', 'birthdate': '10/1/1989' },
    { 'name': 'Paul', 'age': '29', 'birthdate': '10/14/1990' },
    { 'name': 'Dennis', 'age': '25', 'birthdate': '11/29/1993' },
    { 'name': 'Tim', 'age': '27', 'birthdate': '3/12/1991' },
    { 'name': 'Erik', 'age': '24', 'birthdate': '10/31/1995' },
]

function buildTable(data) {
    let table = $("#table-data");
    //LOOP THROUGH DATA APPENED TO TABLE
    table.empty()
    $.each(data, (a, b) => {
        let tData = b;
        let row = `<tr>
        <td>${tData.name}</td>
        <td>${tData.age}</td>
        <td>${tData.birthdate}</td>
        </tr>`
        table.append(row);
    })
}

function searchTable(value, data) {
    let filteredData = [];

    $.each(data, (a, b) => {
        console.log(b)
        value = value.toLowerCase();
        let name = b.name.toLowerCase();

        if (name.includes(value)) {
            filteredData.push(b);
        }

    })

    return filteredData;
}

buildTable(myArray)

$(document).ready(() => {
    $('th').on('click', function () {
        //get column names baseed on click
        let column = $(this).data('column');
        let order = $(this).data('order');
        let text = $(this).html();
        text = text.substring(0, text.length - 1)
        //check for ascend or decend
        if (order == 'desc') {
            $(this).data('order', 'asc');
            myArray = myArray.sort((a, b) => a[column] > b[column] ? 1 : -1)
            //change arrow icon
            text += "&#9660"
        } else {
            $(this).data('order', 'desc');
            myArray = myArray.sort((a, b) => a[column] < b[column] ? 1 : -1)
            //change arrow icon
            text += "&#9650"
        }
        $(this).html(text)
        buildTable(myArray);
    })

    $('#search-input').on('keyup', () => {
        let value = $('#search-input').val()
        console.log(value)
        let data = searchTable(value, myArray)
        buildTable(data)
    })
})