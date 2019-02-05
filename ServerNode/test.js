const points =[

{ lat: 49.281372, long: -123.114542},
{ lat: 49.2844, long: -123.1089},
{ lat: 49.2757, long: -123.1199}]

function Center(points) {
    var l = points.length;
  
    return points.reduce(function(center, p, i) {
      center.lat += p.lat;
      center.long += p.long;
  
      if(i === l - 1) {
          center.lat /= l;
          center.long /= l;
      }
  
      return center;
    }, {lat: 0, long: 0});
  };
  const center = Center(points);
  for(let i =0; i<30; i++){
  console.log(Math.floor(Math.random()*10))
  }