const React = require('react');
const { lazy, Suspense, useState } = React;
const WebpackIcon = require('../assets/images/webpack-icon.svg');
require('./index.less');

const Search = () => {
  // const [number, setNumber] = useState(0);

  const handleLoadComponent = async () => {
    console.log(123);
    // console.log(number);
    // setNumber(number + 1);
    // try {
    //   const newText = await require('./text').default;
    //   setText(newText);
    // } catch (e) {
    //   console.error(e.message);
    // }
  };

  return (
    <Suspense fallback={<div>loaidng</div>}>
      <div className='search-text'>
        {/* {Text ? <Text /> : null} */}
        <br />
        Search Text Search Text Search Text666
        <br />
        <img
          alt='WebpackIcon'
          className='img-size'
          src={WebpackIcon}
          onClick={handleLoadComponent}
          onKeyDown={handleLoadComponent}
        />
      </div>
    </Suspense>
  );
};

module.exports = <Search />;
