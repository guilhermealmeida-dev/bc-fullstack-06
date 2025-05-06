import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    gap: 10,
  },
  header: {
    height: 250,
    backgroundColor: '#00BC7D',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    position: 'relative',
    zIndex: 1,
    paddingTop: 20,
  },
  headerContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    flex: 1,
  },
  headerNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerContainerBack: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: 80,
  },
  headerContainerIcons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: 80,
    gap: 15,
  },
  headerContent: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  headerImageProfile: {
    width: 104,
    height: 104,
    borderRadius: 52,
  },
  headerUserName: {
    fontSize: 28,
  },
  content: {
    flex: 1,
    gap: 10,
    paddingHorizontal: 10,
    paddingBottom: 40,
  },

  scrollContainer: {
    flexGrow: 1,
    gap: 10,
  },
  headerSection: {
    gap: 10,
    paddingHorizontal: 10,
  },
});
