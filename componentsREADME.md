# Components

Our components are deployed [here](http://components.bounties.network).

## Table of Contents

- [Text](#text)
- [Button](#button)
- [Payout](#payout)
- [Chip](#chip)
- [Dialogue](#dialogue)
- [Card](#card)
- [Bounty Card](#bounty-card)


## Text

### Properties

- className: String: Applies the Class Name to the component
- style: One of: H1, H2, H3, H4, CardHeading, Body, BodySmall, FormLabel, FormInvalid, Alt
- src: String: The link to the text class
- link: Boolean: Denoting whether it should be an `a` tag or not
- color: String: Denotes what color it should be

### Defaults

- className: N/A
- style: Body
- src: N/A
- link: N/A
- color: N/A

### Usage Example:

```
<Text
  className={'someText'}
  style={'H2'}
>The quick brown fox jumps over the lazy dog. ? !</Text>
```


## Button

### Button Text

Button text is passed in through props.child. Example: `<Button>Text Here</Button>`

### Properties

- className: String: Applies the Class Name to the component
- style: One of: primary, secondary, destructive, or link. Denotes style of button
- size: One of: small, medium, large. Denotes size of button.
- disabled: Boolean: Denoting whether or not it is a disabled button or not.
- onClick: Function: Triggers the passed in function when button is clicked.

### Defaults

- Text Default: Button

- className: N/A
- style: primary
- size: medium
- disabled: false
- onClick: N/A

### Usage Examples

```
<Button
  className={'ButtonClass'}
  style={'secondary'}
  size={'large'}
  disabled={'false'}
  onClick={() => {console.log('hello')}}
>Hello Button</Button>

```

## Payout

### Properties

- USD: Number: US Dollar Amount. If using the API, should be `usd_price`
- amount: Number: Token Amount. If using the API, should be `calculated_fulfillmentAmount`
- symbol: String: Token Symbol. If using the API, should be `tokenSymbol`

### Defaults

- USD: 0
- amount: 0.0
- symbol: ETH

### Usage Examples

```
<Payout
  USD={usd_price}
  amount={calculated_fulfillmentAmount}
  symbol={tokenSymbol}
/>

```

## Chip

Chips are used when showing multiple tags/hashtags/categories. Not meant to be clicked on, just for displaying. (Typically one word)

### Chip Text

Will be passed in through props.children. Example: `<Chip>Text</Chip>`

### Usage Examples

```
const renderCategories = categories => {
  return categories.map(elem => <Chip>{elem.name}</Chip>);
};

// renders a list of chips with the categories being the text
```


## Dialogue



## Card

## Bounty Card

