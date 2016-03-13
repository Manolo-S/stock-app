$(function () {
    var seriesOptions = [],
        seriesCounter = 0,
        names = ['MSFT', 'AAPL', 'GOOG', 'GOOGL'];

    function formatDate (d) {  //Qandl only gives date in format "yyyy-mm-dd", Highstock needs date in milsec
        var date = new Date(d[0])
        d.splice(0,1,date.getTime());
        return d
    }

    /**
     * Create the chart when all data is loaded
     * @returns {undefined}
     */
    function createChart() {

        $('#container').highcharts('StockChart', {

            rangeSelector: {
                selected: 4
            },

            yAxis: {
                labels: {
                    formatter: function () {
                        return (this.value > 0 ? ' + ' : '') + this.value + '%';
                    }
                },
                plotLines: [{
                    value: 0,
                    width: 2,
                    color: 'silver'
                }]
            },

            plotOptions: {
                series: {
                    compare: 'percent'
                }
            },

            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
                valueDecimals: 2
            },

            series: seriesOptions
        });
    }

    $.each(names, function (i, name) {

        $.getJSON('https://www.quandl.com/api/v3/datasets/WIKI/' + name + '/data.json?order=asc&exclude_column_names=true&start_date=2011-03-06&end_date=2016-03-05&column_index=4&api_key=NtyuDaeuf42LJ3wd1p6M',
    function (data) {
            var data = data.dataset_data.data.map(formatDate)
            seriesOptions[i] = {
                name: name,
                data: data
            };

            // As we're loading the data asynchronously, we don't know what order it will arrive. So
            // we keep a counter and create the chart when all the data is loaded.
            seriesCounter += 1;

            if (seriesCounter === names.length) {
                createChart();
            }
        });
    });
});