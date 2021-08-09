// import DFUI from '@altran-df-mtp/framework-native-df-ui-kit';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import React, { useRef, useState, useEffect } from 'framework';
// import { ActivityIndicator as Loader, ImageBackground, Text, View } from 'framework-native';
// import { ScrollView } from 'framework-native-gesture-handler';
// import RNPickerSelect from 'framework-native-picker-select';
// import Society from '../../assets/icons/society.svg';
// import Pen from '../../assets/icons/pen.svg';
// import CompanyModal from '../../components/CompanyModal/CompanyModal';
// import RegisterHeader from '../../components/RegisterHeader/RegisterHeader';
// import { CONST } from '../../constants/constants';
// import { HeaderType } from '../../constants/enums/headerType.enum';
// import { Company } from '../../constants/interfaces/company.interface';
// import useHeader from '../../hooks/useHeader.hook';
// import i18n from '../../i18n/i18n';
// import style, {
//     disabledButton,
//     enabledButton,
//     enabledButtonValidate,
//     pickerSelectStyles,
//     modalStyle,
// } from './RegisterProfessional.style';
// import { getCompanies } from '../../api/requests/company';
// import { NotificationType } from '../../constants/enums/notificationType.enum';
// import store from '../../store/store';
// import { addNotification } from '../../store/slices/notificationsSlice';
//
// const COUNTRIES = [
//     { label: 'France', value: 'FR' },
//     { label: 'Espagne', value: 'ES' },
//     { label: 'Belgique', value: 'BE' },
// ];
//
// const displayedInformations = ['name', 'street', 'siren', 'siret', 'activity'];
//
// const RegisterProfessional: React.FC = () => {
//     useHeader(
//         HeaderType.REGISTER,
//         i18n.t('RegisterProfessional.titleSecondStep'),
//         CONST.COLORS.WHITE
//     );
//
//     const { params }: any = useRoute();
//
//     const { navigate } = useNavigation();
//
//     const [siren, setSiren] = useState('');
//     const [company, setCompany] = useState<Company>();
//     const [companyList, setCompanyList] = useState<Company[]>([]);
//     const [country, setCountry] = useState('');
//     const [loading, isLoading] = useState(false);
//
//     const modalRef = useRef<any>();
//
//     useEffect(() => {
//         setCompany(undefined);
//     }, [siren, country]);
//
//     /**
//      * Search companies for given siren.
//      * If more than one result, display a modal to choose
//      */
//     const searchSiren = async () => {
//         try {
//             setCompany(undefined);
//             isLoading(true);
//             const data: Company[] = await getCompanies(siren, country);
//             if (data.length > 1) {
//                 setCompanyList(data);
//                 modalRef.current.open();
//             }
//             if (data.length === 1) {
//                 setCompany(data[0]);
//             }
//             isLoading(false);
//         } catch (error) {
//             console.error(error);
//             isLoading(false);
//         }
//     };
//
//     const companyChose = (companyData: Company) => {
//         setCompany(companyData);
//         modalRef.current.close();
//         store.dispatch(
//             addNotification({
//                 text: i18n.t('RegisterProfessional.addressChosen'),
//                 type: NotificationType.SUCCESS,
//             })
//         );
//     };
//
//     const validate = () =>
//         navigate('RegisterPersonal', {
//             company: company?.name,
//             siren: siren,
//             siret: company?.siret,
//             country,
//             blGroup: params?.blGroup,
//         });
//
//     const isSearchEnabled = () => country?.length > 0 && siren.length === 9;
//
//     const Informations = (information: string) => {
//         const label = i18n.t(`Company.${information}`);
//
//         return label ? (
//             <View key={information} style={style.companyDetails}>
//                 <Text style={style.label}>{label} : </Text>
//                 <Text style={style.value}>{company[information]} </Text>
//             </View>
//         ) : null;
//     };
//
//     const SearchFields = () => {
//         return company ? (
//             <View style={style.row}>
//                 <Text style={style.label}>{i18n.t('RegisterProfessional.siren')} : </Text>
//                 <Text style={style.value}>{siren}</Text>
//                 <Pen
//                     height={20}
//                     width={20}
//                     style={style.icon}
//                     onPress={() => setCompany(undefined)}
//                 />
//             </View>
//         ) : (
//             <View>
//                 <DFUI.TextInput
//                     styles={style}
//                     placeholder={i18n.t('RegisterProfessional.siren')}
//                     value={siren}
//                     setValue={(value) => setSiren(value)}
//                     placeholderTextColor={CONST.COLORS.MID_CONTRAST}
//                     maxLength={9}
//                     keyboardType={DFUI.KeyboardType.NUMBER_PAD}
//                     pattern={'(?=.*\\d)'}
//                 />
//                 <RNPickerSelect
//                     style={pickerSelectStyles}
//                     placeholder={{ label: i18n.t('RegisterProfessional.country') }}
//                     onValueChange={(value) => setCountry(value)}
//                     items={COUNTRIES}
//                 />
//                 <DFUI.Button
//                     underlayColor={CONST.COLORS.PRIMARY}
//                     onPress={searchSiren}
//                     style={isSearchEnabled() ? enabledButton : disabledButton}
//                     text={i18n.t('RegisterProfessional.search')}
//                     disabled={!isSearchEnabled()}
//                 />
//                 <Text>{i18n.t('RegisterPersonal.mandatorySentence')}</Text>
//             </View>
//         );
//     };
//
//     return (
//         <>
//             <ImageBackground
//                 style={style.backgroundImage}
//                 testID={'BackgroundImage'}
//                 source={require('../../assets/images/background-register-step-2.png')}>
//                 <RegisterHeader Image={Society} text={i18n.t('RegisterProfessional.myCompany')} />
//                 <ScrollView>
//                     <View style={style.container}>
//                         {SearchFields()}
//                         {loading && <Loader style={style.loader} size="large" />}
//                         {company && displayedInformations.map(Informations)}
//                         {company && (
//                             <DFUI.Button
//                                 onPress={validate}
//                                 style={enabledButtonValidate}
//                                 underlayColor={CONST.COLORS.ROSE}
//                                 text={i18n.t('RegisterProfessional.validate')}
//                             />
//                         )}
//                     </View>
//                 </ScrollView>
//             </ImageBackground>
//
//             <DFUI.Modal
//                 ref={modalRef}
//                 title={i18n.t('RegisterProfessional.modalTitle')}
//                 whiteCloseIcon
//                 styles={modalStyle}>
//                 <CompanyModal companies={companyList} onClick={companyChose} />
//             </DFUI.Modal>
//         </>
//     );
// };
//
// export default RegisterProfessional;
