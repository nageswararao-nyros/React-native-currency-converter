import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    paddingTop: 10,
    alignItems: 'center',
    paddingBottom: 10
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 19,
    marginRight:11,
  },
  text: {
    color: '$white',
    fontSize: 16,
    letterSpacing: -0.5,
    fontWeight: '300',
  },
});