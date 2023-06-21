const url = window.location.href;

// Add button to game pages.
if (url.indexOf('boxscores') > 0) {
    const scorebox_meta = document.getElementsByClassName('scorebox_meta');
    let gamedate = scorebox_meta[0].firstElementChild.textContent;
    let date = new Date(gamedate);
    
    // Extract the parts of the date.
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();    
    
    // Format date in 2022-10-06 format.
    let newdate = year + '-' + month.toString().padStart(2,"0") + '-' + day.toString().padStart(2,"0");
    
    const title = document.getElementsByTagName('h1');
    let title_array = title[0].textContent.split(' - ');
    if (title_array.length > 2) {
        if (title_array[1].search('vs.') > 0) {
            var teams_array = title_array[1].split(' vs. ');
        }
        else {
            var teams_array = title_array[1].split(' at ');
        }
    }
    else {
        var teams_array = title_array[0].split(' at ');
    }
    let team1 = teams_array[0].replaceAll(' ', '-');
    let team2 = teams_array[1].replaceAll(' ', '-');
    
    
    let getty_search_url = 'https://www.gettyimages.com/photos/'
                         + team1 + '-' + team2
                         +'?assettype=image&phrase='
                         + encodeURIComponent(teams_array[0])
                         + '%20'
                         + encodeURIComponent(teams_array[1])
                         + '&suppressfamilycorrection=true&sort=best&license=rf%2Crm&recency=daterange&begindate='
                         + newdate
                         + '&enddate='
                         + newdate;
    document.getElementsByClassName('scorebox_meta')[0].insertAdjacentHTML("afterbegin",'<div class="button"><a class="button" href="'+getty_search_url+'" target="_blank">Getty Images</a></div>');
}

// Add links to team boxscore tables.
if (url.indexOf('teams') > 0) {
    const tables = document.getElementsByTagName('table');
    Object.entries(tables).forEach(t => {
        if (t[1].id == 'games') {
            console.log(t);
        }
    });
}

// Add links to player tables.
if (url.indexOf('players') > 0) {
    const stats_tables = document.getElementsByClassName('table_wrapper');
    const tables = [
        'all_passing',
        'all_rushing_and_receiving',
        'all_receiving_and_rushing',
        'all_defense'
    ];
    // Get player name.
    var playerh1 = document.getElementsByTagName('h1');
    var player_name = playerh1[0].textContent.trim();

    // Get all tables on the page.
    Object.entries(stats_tables).forEach(element => {
        if (tables.includes(element[1].id)) {
            let stat_tables = element[1].getElementsByTagName('table');
            // Whittle down to only high-level stat tables.
            Object.entries(stat_tables).forEach(t => {
                // Get the header of each table to insert new <th>.
                var thead = t[1].getElementsByTagName('thead');
                var thead_tr = thead[0].getElementsByTagName('tr');
                if (element[1].id == 'all_passing') {
                    thead_tr[0].insertAdjacentHTML('beforeend', '<th>Getty</th>');
                }
                else {
                    thead_tr[1].insertAdjacentHTML('beforeend', '<th>Getty</th>');
                }
                // Add new <td> to each row with Getty link.
                var tbody = t[1].getElementsByTagName('tbody');
                var tbody_tr = tbody[0].getElementsByTagName('tr');

                Object.entries(tbody_tr).forEach(tr => {

                    let year_array = tr[1].id.split('.');
                    let year = year_array[1];
                    let start = new Date(year, 7, 1);
                    // Extract the parts of the date.
                    let d = start.getDate();
                    let m = start.getMonth() + 1;
                    let y = start.getFullYear();
                    // Format date in 2022-10-06 format.
                    let start_date = y + '-' + m.toString().padStart(2,"0") + '-' + d.toString().padStart(2,"0");
                    let end = new Date(year, 1, 28);
                    // Extract the parts of the date.
                    let ed = end.getDate();
                    let em = end.getMonth() + 1;
                    let ey = end.getFullYear() + 1;
                    // Format date in 2022-10-06 format.
                    let end_date = ey + '-' + em.toString().padStart(2,"0") + '-' + ed.toString().padStart(2,"0");

                    // https://www.gettyimages.com/photos/tom-brady?family=editorial&assettype=image&phrase=tom%20brady&sort=mostpopular&recency=daterange&begindate=2001-08-01&enddate=2002-02-28
                    let getty_search_url = 'https://www.gettyimages.com/photos/'
                         + encodeURIComponent(player_name)
                         +'?family=editorial&assettype=image&phrase='
                         + encodeURIComponent(player_name)
                         + '&sort=mostpopular&recency=daterange&begindate='
                         + start_date
                         + '&enddate='
                         + end_date;
                    tr[1].insertAdjacentHTML('beforeend', '<td><a href="'+getty_search_url+'" target="_blank">Getty</a></td>');
                });
                
            });
            
        }
    });
}