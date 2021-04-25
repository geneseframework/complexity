import DFUI from '@altran-df-mtp/react-native-df-ui-kit';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { getMenuItems } from '../../api/requests/menu-items';
import CategoryItem from '../../components/CategoryItem/CategoryItem';
import { HeaderType } from '../../constants/enums/headerType.enum';
import { Resource } from '../../constants/interfaces/resource.interface';
import { useNavBar } from '../../hooks/navbar.hook';
import useHeader from '../../hooks/useHeader.hook';
import useRequest from '../../hooks/useRequest.hook';
import i18n from '../../i18n/i18n';
import style, { tabsStyle } from './Categories.style';

function Categories() {
// const Categories: React.FC = () => {
    useNavBar(2);
    useHeader(HeaderType.DEFAULT, i18n.t('Header.categories'));
    const [menuItems, setMenuItems] = useState<Resource[][]>([]);

    useRequest(getMenuItems, (data) => {
        setMenuItems(Object.values(data));
    });

    /**
     * Map a resource to a category item
     * @param resource the resource
     */
    const mapCategory = (resource: Resource) => (
        <CategoryItem key={JSON.stringify(resource)} resource={resource} />
);

    /**
     * Map resources to a tab
     * @param resources the resources
     */
    const mapTab = (resources: Resource[]) => (
        <ScrollView key={JSON.stringify(resources)} style={style.container}>
    <View style={style.content}>{resources.map(mapCategory)}</View>
        </ScrollView>
);

    return (
        <SafeAreaView style={style.container}>
        <DFUI.Tabs
            titles={[i18n.t('Categories.hairDressing'), i18n.t('Categories.aesthetic')]}
    styles={tabsStyle}>
        {menuItems.map(mapTab)}
        </DFUI.Tabs>
        </SafeAreaView>
);
};

export default Categories;
