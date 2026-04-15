# 💎 YDanh Kit (React Native)

A premium, lightweight, and dependency-free UI Kit for React Native inspired by "Liquid Glass" design aesthetics.

---

## 🚀 Getting Started

### Installation
Currently, this is a local package. To use it in your project:

```bash
# In your project's package.json
"dependencies": {
  "react-native-ydanh-kit": "*"
}
```

### Main Layout Wrapper
Always wrap your form screens with `KitKeyboardLayout` to handle keyboard avoiding and scrolling automatically.

```tsx
import { KitKeyboardLayout } from 'react-native-ydanh-kit';

<KitKeyboardLayout>
  {/* Your content here */}
</KitKeyboardLayout>
```

---

## 📦 Components Reference

### 1. KitHeader
The navigation bar of your app. Supports transparent overlay mode.

#### Props
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `title` | `string` | **Required** | Title of the header (auto-uppercase). |
| `subtitle` | `string` | `undefined` | Optional subtitle below the title. |
| `transparent` | `boolean` | `false` | If true, background is transparent and position is absolute. |
| `showBack` | `boolean` | `true` | Show/hide the back button. |
| `onBack` | `function` | `undefined` | Callback for back button press. |
| `rightContent` | `ReactNode` | `undefined` | Custom component on the right side. |

#### Usage
```tsx
import { KitHeader } from 'react-native-ydanh-kit';

<KitHeader 
  title="Profile" 
  subtitle="Manage your settings" 
  onBack={() => goBack()} 
/>
```

---

### 2. KitCard
A premium container with large border radius and soft shadows.

#### Props
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `children` | `ReactNode` | **Required** | Content inside the card. |
| `style` | `ViewStyle` | `{}` | Custom styles for the card container. |

#### Usage
```tsx
import { KitCard } from 'react-native-ydanh-kit';

<KitCard>
  <Text>Premium Content Here</Text>
</KitCard>
```

---

### 3. KitInfoItem
Displays a label-value pair, ideal for profile or mission details.

#### Props
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `label` | `string` | **Required** | The field name (e.g., "Full Name"). |
| `value` | `string` | **Required** | The actual value (e.g., "Anh Duy"). |
| `icon` | `ReactNode` | `undefined` | Optional icon on the left. |
| `isLast` | `boolean` | `false` | If true, hides the bottom separator. |

#### Usage
```tsx
import { KitInfoItem } from 'react-native-ydanh-kit';

<KitInfoItem label="Status" value="Active" icon={<View style={styles.dot} />} />
```

---

### 4. KitInput
A high-fidelity text input with focus states and labels.

#### Props
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `label` | `string` | `undefined` | Label text above the input. |
| `icon` | `ReactNode` | `undefined` | Left-side icon. |
| `rightContent` | `ReactNode` | `undefined` | Right-side action/text. |
| `...TextInputProps` | `Props` | | Inherits all standard React Native TextInput props. |

#### Usage
```tsx
import { KitInput } from 'react-native-ydanh-kit';

<KitInput label="Username" placeholder="Enter name" />
```

---

### 5. KitTimePicker (Wheel)
A bottom sheet scroll-based time picker.

#### Props
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `visible` | `boolean` | **Required** | Controls visibility. |
| `initialTime` | `Date` | `new Date()` | Initial time value. |
| `onConfirm` | `(Date) => void` | **Required** | Callback when "Done" is pressed. |
| `onClose` | `function` | **Required** | Callback to dismiss the sheet. |

#### Usage
```tsx
import { KitTimePicker } from 'react-native-ydanh-kit';

<KitTimePicker 
  visible={show} 
  onConfirm={(date) => setTime(date)} 
  onClose={() => setShow(false)} 
/>
```

---

### 6. KitCustomerPicker
A searchable list picker for selecting items (e.g., Passengers).

#### Props
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `visible` | `boolean` | **Required** | Controls visibility. |
| `customers` | `Customer[]` | `[]` | Array of `{ id, name, phone }`. |
| `selectedId` | `string` | `undefined` | ID of the currently selected item. |
| `onSelect` | `(Customer) => void` | **Required** | Callback when an item is chosen. |

#### Usage
```tsx
import { KitCustomerPicker } from 'react-native-ydanh-kit';

<KitCustomerPicker 
  visible={show} 
  customers={data} 
  onSelect={(item) => setSelected(item)} 
/>
```

---

## 🎨 Design System
- **Primary Color:** `#3366FF`
- **Background Color:** `#F7F9FC`
- **Title Font Weight:** `900`
- **Border Radius:** `16px` (Inputs), `32px` (Cards), `40px` (Sheets)
