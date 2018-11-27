document.addEventListener("DOMContentLoaded", function() {
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // variables
  let button = document.querySelector('.button');
  const REQUESTURL = "https://maitre-d.tucha.ua/api/bank_statement_details";
  const TEMPURL = "assets/json/bank_statement_details.json";//local path
  const USERNAME = "2018110613000901";
  const PASSWORD = "eeng9oeha8Ee";
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // add button event listener
  button.addEventListener("click", showContent);
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //functions
  function showContent() {
    // shows table header content
    renderTableHeadContent();
    // shows table content if data available
    getData();
    //remove button event listener
    button.removeEventListener("click", showContent);
  }
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  function getData() {
    axios.get(TEMPURL, {}, {
                withCredentials: true,
                auth: {
                  username: USERNAME,
                  password: PASSWORD
                }
    }).then( (response) => {
      console.log(response.data);
      console.log(response.status);
      console.log(response.statusText);
      console.log(response.headers);
      console.log(response.config);
      // shows table content
      renderTableBodyContent(response.data);
      // creates interactive table from received data
      $('.table').DataTable({
        // makes some columns hidden
        // "columnDefs": [
        //     {
        //         "targets": [ 3 , 5 , 6 , 7 , 8 , 10 ],
        //         "visible": false,
        //         "searchable": true
        //     }
        // ]
      });
      //add table row onclick event listener
      var table = $('.table').DataTable();
      $('.table tbody').on('click', 'tr', function() {
        var data = table.row(this).data();
        //marks table row as active
        $(this).toggleClass('active');
        // alert('You clicked on '+data[0]+'\'s row');
        console.log(data);
    });
    })
    .catch( (err) => console.log(err));
  }
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  function renderTableHeadContent() {
    let thead = document.querySelector('.table thead');
    let tableHTML = '';
    //renders table header content
    thead.innerHTML = '';
    tableHTML += renderTableHeadTemplate();
    thead.innerHTML = tableHTML;
    // console.log(tableHTML);
  }
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //table header content rendering
  let renderTableHeadTemplate = () => {
    return `<tr>
              <th scope="col">№</th>
              <th scope="col">Имя клиента</th>
              <th scope="col">ЕГРПОУ клиента</th>
              <th scope="col">МФО банка плательщика</th>
              <th scope="col">Банк клиента</th>
              <th scope="col">Счет клиента</th>
              <th scope="col">МФО банка получателя</th>
              <th scope="col">Банковский счет</th>
              <th scope="col">Платежный документ</th>
              <th scope="col">Дата платежа</th>
              <th scope="col">Дата операции</th>
              <th scope="col">Описание</th>
              <th scope="col">Сумма</th>
            </tr>`;
  }
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //table row content rendering
  let renderTableRowTemplate =
  (
    id,
    client_name,
    client_edrpou,
    client_mfo,
    client_bank_name,
    client_bank_account,
    mfo,
    bank_account,
    docn,
    docdate,
    opdate,
    description,
    kredit
  ) => {
    return `<tr>
              <th scope="row">${id}</th>
              <td>${client_name}</td>
              <td>${client_edrpou}</td>
              <td>${client_mfo}</td>
              <td>${client_bank_name}</td>
              <td>${client_bank_account}</td>
              <td>${mfo}</td>
              <td>${bank_account}</td>
              <td>${docn}</td>
              <td>${docdate}</td>
              <td>${opdate}</td>
              <td>${description}</td>
              <td>${kredit}</td>
            </tr>`;
  }
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//creates tbody content
 function renderTableBodyContent(arr) {
  let tbody = document.querySelector('.table tbody');
  let tableHTML = '';
  //render every single table row content
  tbody.innerHTML = '';
  arr.forEach( (item) => {
    let id = item.id;
    let client_name = item.client_name;
    let client_edrpou = item.client_edrpou;
    let client_mfo = item.client_mfo;
    let client_bank_name = item.client_bank_name;
    let client_bank_account = item.client_bank_account;
    let mfo = item.mfo;
    let bank_account = item.bank_account;
    let docn = item.docn;
    let docdate = item.docdate;
    let opdate = item.opdate;
    let description = item.description;
    let kredit = parseFloat(item.kredit).toFixed(2);
    tableHTML += renderTableRowTemplate(
      id,
      client_name,
      client_edrpou,
      client_mfo,
      client_bank_name,
      client_bank_account,
      mfo,
      bank_account,
      docn,
      docdate,
      opdate,
      description,
      kredit
    );
  });
  tbody.innerHTML = tableHTML;
  // console.log(tableHTML);
}
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
});
