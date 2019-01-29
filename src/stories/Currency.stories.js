import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { Currency, Text } from 'components';

storiesOf('Currency', module).add('Currency', () => (
  <div className="sb-page-wrapper">
    <Text
      className={'sb-component-group-heading'}
      typeScale="h1"
      color="purple"
      weight="fontWeight-bold"
    >
      Currency
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      Currency components are useful to represent money in different currencies
      with different styles.
    </Text>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      primaryValue
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>primaryValue</code> prop will display the primary value of the
      currency. It can be either an integer or a string. The default value is{' '}
      <code>0</code>.
    </Text>

    <div className="sb-component-group sb-button-group">
      <Currency />
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      primaryCurrency
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>primaryCurrency</code> prop will determine the currency of the
      primary value. The default value is <code>usd</code> and will be replaced
      with the dollar sign ($).
    </Text>

    <div className="sb-component-group sb-button-group">
      <Currency primaryValue={10.35} primaryCurrency="usd" />
      <Currency primaryValue={10.35} primaryCurrency="€" />
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      primaryDecimals
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>primaryDecimals</code> prop is used to round the primaryValue to
      this amount of decimals. <code>all</code> can be used to display all
      decimals. The default value is <code>2</code>.
    </Text>

    <div className="sb-component-group sb-button-group">
      <Currency primaryValue={10.353635} primaryCurrency="usd" />
      <Currency
        primaryValue={10.353635}
        primaryCurrency="usd"
        primaryDecimals={4}
      />
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      primaryDecimals
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>primaryTypeScale</code> prop will determine the size of the
      primary value. It can go from <code>h1</code> to <code>h5</code> or be{' '}
      <code>Body</code>
      or <code>Small</code>. The default is <code>h2</code>.
    </Text>

    <div className="sb-component-group sb-button-group">
      <Currency primaryValue={10.353635} primaryCurrency="usd" />
      <br />
      <Currency
        primaryValue={10.353635}
        primaryCurrency="usd"
        primaryDecimals={4}
        primaryTypeScale="h4"
      />
      <br />
      <Currency
        primaryValue={10.353635}
        primaryCurrency="usd"
        primaryDecimals={4}
        primaryTypeScale="h5"
      />
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      primaryWeight
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>primaryWeight</code> prop will determine the weight of the
      primary value. It can be <code>fontWeight-regular</code>,
      <code>fontWeight-medium</code> or <code>fontWeight-bold</code>. The
      default is <code>fontWeight-regular</code>.
    </Text>

    <div className="sb-component-group sb-button-group">
      <Currency
        primaryValue={10.353635}
        primaryCurrency="usd"
        primaryWeight="fontWeight-regular"
      />
      <br />
      <Currency
        primaryValue={10.353635}
        primaryCurrency="usd"
        primaryDecimals={4}
        primaryWeight="fontWeight-medium"
      />
      <br />
      <Currency
        primaryValue={10.353635}
        primaryCurrency="usd"
        primaryDecimals={4}
        primaryWeight="fontWeight-bold"
      />
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      primaryColor
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>primaryColor</code> prop will determine the color of the primary
      value. It can be <code>orange</code>,
      <code>green</code>, <code>red</code>, <code>lightGrey</code>,
      <code>white</code> or <code>nearWhite</code>. The default value is
      <code>purple</code>.
    </Text>

    <div className="sb-component-group sb-button-group">
      <Currency
        primaryValue={10.353635}
        primaryCurrency="usd"
        primaryWeight="fontWeight-regular"
        primaryColor="orange"
      />
      <br />
      <Currency
        primaryValue={10.353635}
        primaryCurrency="usd"
        primaryWeight="fontWeight-regular"
        primaryColor="green"
      />
      <br />
      <Currency
        primaryValue={10.353635}
        primaryCurrency="usd"
        primaryWeight="fontWeight-regular"
        primaryColor="green"
      />
      <br />
      <Currency
        primaryValue={10.353635}
        primaryCurrency="usd"
        primaryWeight="fontWeight-regular"
        primaryColor="red"
      />
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      currencyTypeScale
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>currencyTypeScale</code> will determine the size of the text of
      the currency.
    </Text>

    <div className="sb-component-group sb-button-group">
      <Currency
        primaryValue={10.353635}
        primaryCurrency="euros"
        primaryWeight="fontWeight-regular"
        primaryColor="orange"
        currencyTypeScale="h1"
      />
      <Currency
        primaryValue={10.353635}
        primaryCurrency="euros"
        primaryWeight="fontWeight-regular"
        primaryColor="orange"
        currencyTypeScale="h3"
      />
      <Currency
        primaryValue={10.353635}
        primaryCurrency="euros"
        primaryWeight="fontWeight-regular"
        primaryColor="orange"
        currencyTypeScale="h5"
      />
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      currencyWeight
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>currencyWeight</code> will determine the weight of the text of
      the currency. It can be <code>fontWeight-regular</code>,
      <code>fontWeight-medium</code> or <code>fontWeight-bold</code>. The
      default is <code>fontWeight-regular</code>.
    </Text>

    <div className="sb-component-group sb-button-group">
      <Currency
        primaryValue={10.353635}
        primaryCurrency="euros"
        primaryWeight="fontWeight-regular"
        primaryColor="orange"
        currencyTypeScale="h3"
        currencyWeight="fontWeight-regular"
      />
      <Currency
        primaryValue={10.353635}
        primaryCurrency="euros"
        primaryWeight="fontWeight-regular"
        primaryColor="orange"
        currencyTypeScale="h3"
        currencyWeight="fontWeight-medium"
      />
      <Currency
        primaryValue={10.353635}
        primaryCurrency="euros"
        primaryWeight="fontWeight-regular"
        primaryColor="orange"
        currencyTypeScale="h3"
        currencyWeight="fontWeight-bold"
      />
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      currencyColor
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>currencyWeight</code> will determine the color of the text of
      the currency. It can be <code>purple</code>, <code>blue</code>,
      <code>orange</code>, <code>green</code>, <code>red</code>,
      <code>black</code>, <code>white</code>, <code>defaultGrey</code>,
      <code>lightGrey</code> or <code>darkGrey</code>. The default is{' '}
      <code>purple</code>.
    </Text>

    <div className="sb-component-group sb-button-group">
      <Currency
        primaryValue={10.353635}
        primaryCurrency="euros"
        primaryWeight="fontWeight-regular"
        primaryColor="orange"
        currencyTypeScale="h3"
        currencyColor="purple"
      />
      <Currency
        primaryValue={10.353635}
        primaryCurrency="euros"
        primaryWeight="fontWeight-regular"
        primaryColor="orange"
        currencyTypeScale="h3"
        currencyColor="red"
      />
      <Currency
        primaryValue={10.353635}
        primaryCurrency="euros"
        primaryWeight="fontWeight-regular"
        primaryColor="orange"
        currencyTypeScale="h3"
        currencyColor="green"
      />
      <Currency
        primaryValue={10.353635}
        primaryCurrency="euros"
        primaryWeight="fontWeight-regular"
        primaryColor="orange"
        currencyTypeScale="h3"
        currencyColor="black"
      />
      <Currency
        primaryValue={10.353635}
        primaryCurrency="euros"
        primaryWeight="fontWeight-regular"
        primaryColor="orange"
        currencyTypeScale="h3"
        currencyColor="darkGrey"
      />
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      secondaryValue
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>secondaryValue</code> prop can be used to display a secondary
      value below the primary one. By default, there is no secondary value.
    </Text>

    <div className="sb-component-group sb-button-group">
      <Currency
        primaryValue={10.353635}
        primaryCurrency="euros"
        primaryWeight="fontWeight-regular"
        primaryColor="orange"
        currencyTypeScale="h3"
        currencyColor="purple"
        secondaryValue={50.64}
      />
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      secondaryCurrency
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>secondaryCurrency</code> prop will determine the currency of the
      secondary value.
    </Text>

    <div className="sb-component-group sb-button-group">
      <Currency
        primaryValue={10.353635}
        primaryCurrency="euros"
        primaryWeight="fontWeight-regular"
        primaryColor="orange"
        currencyTypeScale="h3"
        currencyColor="purple"
        secondaryValue={50.64}
        secondaryCurrency="DOP"
      />
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      secondaryDecimals
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>secondaryDecimals</code> prop is used to round the
      secondaryValue to this amount of decimals. <code>all</code> can be used to
      display all decimals. The default value is <code>all</code>.
    </Text>

    <div className="sb-component-group sb-button-group">
      <Currency
        primaryValue={10.353635}
        primaryCurrency="euros"
        primaryWeight="fontWeight-regular"
        primaryColor="orange"
        currencyTypeScale="h3"
        currencyColor="purple"
        secondaryValue={50.64}
        secondaryCurrency="DOP"
      />
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      secondaryTypeScale
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>secondaryTypeScale</code> prop will determine the size of the
      secondaryValue. It can go from <code>h1</code> to <code>h5</code> or be{' '}
      <code>Body</code>
      or <code>Small</code>. The default is <code>Small</code>.
    </Text>

    <div className="sb-component-group sb-button-group">
      <Currency
        primaryValue={10.353635}
        primaryCurrency="euros"
        primaryWeight="fontWeight-regular"
        primaryColor="orange"
        currencyTypeScale="h3"
        currencyColor="purple"
        secondaryValue={50.64}
        secondaryCurrency="DOP"
        secondaryTypeScale="h2"
      />
      <Currency
        primaryValue={10.353635}
        primaryCurrency="euros"
        primaryWeight="fontWeight-regular"
        primaryColor="orange"
        currencyTypeScale="h3"
        currencyColor="purple"
        secondaryValue={50.64}
        secondaryCurrency="DOP"
        secondaryTypeScale="h3"
      />
      <Currency
        primaryValue={10.353635}
        primaryCurrency="euros"
        primaryWeight="fontWeight-regular"
        primaryColor="orange"
        currencyTypeScale="h3"
        currencyColor="purple"
        secondaryValue={50.64}
        secondaryCurrency="DOP"
        secondaryTypeScale="h5"
      />
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      secondaryColor
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>secondaryColor</code> prop will determine the color of the
      secondaryValue. It can be <code>orange</code>,
      <code>green</code>, <code>red</code>, <code>lightGrey</code>,
      <code>white</code> or <code>nearWhite</code>. The default value is
      <code>defaultGrey</code>.
    </Text>

    <div className="sb-component-group sb-button-group">
      <Currency
        primaryValue={10.353635}
        primaryCurrency="euros"
        primaryWeight="fontWeight-regular"
        primaryColor="orange"
        currencyTypeScale="h3"
        currencyColor="purple"
        secondaryValue={50.64}
        secondaryCurrency="DOP"
        secondaryTypeScale="Small"
        secondaryColor="red"
      />
      <Currency
        primaryValue={10.353635}
        primaryCurrency="euros"
        primaryWeight="fontWeight-regular"
        primaryColor="orange"
        currencyTypeScale="h3"
        currencyColor="purple"
        secondaryValue={50.64}
        secondaryCurrency="DOP"
        secondaryTypeScale="Small"
        secondaryColor="green"
      />
      <Currency
        primaryValue={10.353635}
        primaryCurrency="euros"
        primaryWeight="fontWeight-regular"
        primaryColor="orange"
        currencyTypeScale="h3"
        currencyColor="purple"
        secondaryValue={50.64}
        secondaryCurrency="DOP"
        secondaryTypeScale="Small"
        secondaryColor="blue"
      />
    </div>

    <Text
      className={'sb-component-group-subheading'}
      typeScale="h3"
      weight="fontWeight-bold"
    >
      Adding classes
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>className</code> prop will add classes to the root div of the
      Currency component.
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>primaryClassName</code> prop will add classes to the primary
      value text.
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>secondaryClassName</code> prop will add classes to the secondary
      value text.
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>primaryContainerClass</code> prop will add classes to the
      wrapper of the primary value.
    </Text>

    <Text
      className={'sb-component-group-description'}
      typeScale="Body"
      lineHeight="lineHeight-default"
    >
      The <code>currencyClass</code> prop will add classes to the currency of
      the primary value.
    </Text>
  </div>
));
