// y轴的所有的柱形图和折线图，将展示的内容压缩在Y轴的60%-70%内。
export const chartSetChartyAxisMax = (value) => {
    return parseFloat(value.max * 1.5).toFixed(0);
};


export const chartSetTooltip = {
    textStyle:{
        color:'#333',
        fontSize:13
    },
    backgroundColor: 'rgba(255,255,255,.9)',
    borderColor:'#888',
    borderWidth:1,
    padding:[5,10,5,10]
};

export const chartSetTooltipBlack = {
    textStyle: {
        color: '#ffffff',
        fontSize: 13
    },
    backgroundColor: 'rgba(0,0,0,.7)',
    borderColor: '#ffffff',
    borderWidth: 1,
    padding: [5, 10, 5, 10]
};
