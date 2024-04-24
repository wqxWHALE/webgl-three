export const chartTooltip = {
    textStyle:{
        color:'#333',
        fontSize:13
    },
    backgroundColor: 'rgba(255,255,255,.9)',
    borderColor:'#888',
    borderWidth:1,
    padding:[5,10,5,10]
};
export const chartAxis = {
    lineStyle: {
        color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
                offset: 0,
                color: 'rgba(0, 255, 233,0)'
            }, {
                offset: 0.5,
                color: 'rgba(255, 255, 255,1)',
            }, {
                offset: 1,
                color: 'rgba(0, 255, 233,0)'
            }],
            global: false
        }
    },
};
