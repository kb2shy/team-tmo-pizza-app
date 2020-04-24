import React from 'react';
import PropTypes from 'prop-types';
// import RJSBarcode from 'react-barcode';
import { View, Image, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  section: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 200,
    '@media max-width: 400': {
      width: 300,
    },
    '@media orientation: landscape': {
      width: 400,
    },
  },
});

const Barcode = ({ code, codeBuffer }) => {
  // return <div>{code && <RJSBarcode value={code} displayValue={false} />}</div>;
  return (
    <View style={styles.section}>
      {codeBuffer && (
        <Image
          style={styles.image}
          source={{ data: codeBuffer, format: 'jpg' }}
        />
      )}
    </View>
  );
};

Barcode.propTypes = {
  code: PropTypes.string,
  codeBuffer: PropTypes.object,
};

export default Barcode;
