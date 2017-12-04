import React, { Component } from 'react';
// import numeral from 'numeral';

class HashRepresentation extends Component {
  render() {
    // console.log(this.props)
    let conversion = {
        '0':'0000',
        '1':'0001',
        '2':'0010',
        '3':'0011',
        '4':'0100',
        '5':'0101',
        '6':'0110',
        '7':'0111',
        '8':'1000',
        '9':'1001',
        'a':'1010',
        'b':'1011',
        'c':'1100',
        'd':'1101',
        'e':'1110',
        'f':'1111'
    }

    let renderedElement = '';
    let PIXEL_SIZE = 8.98;
    let PIXEL_SPACE = 1;
    if(this.props.hash){
        renderedElement = this.props.hash.split('').map((d,p)=>{
            return(
            <g transform={'translate('+p*PIXEL_SIZE+',0)'}>
                {
                    conversion[d].split('').map((k,indx)=><rect x="0" y={indx*PIXEL_SIZE} fill={k==='0'?'#446688':'#53e1f2'} width={PIXEL_SIZE-PIXEL_SPACE} height={PIXEL_SIZE-PIXEL_SPACE}/>)
                }
            </g>
            )
        })
    }
    return (
        <g>
         {renderedElement} 
        </g>
    );
  }
}

export default HashRepresentation;
