# 🎨 Ready-to-Use Lovable Prompts

**Copy these prompts directly into Lovable chat to fix UI issues**

---

## 🔥 **PRIORITY 1: Fix Featured Work Cards**

```
CONTEXT:
I have a React profile builder that displays movies in a "Featured Work" section.
The data comes from IMDB scraping and includes movie posters.

CURRENT PROBLEM:
- Movie posters (coverImage URLs) are not displaying
- Cards look plain and unprofessional
- No visual feedback on hover

DATA STRUCTURE:
Each work object has:
{
  title: "Top Gun",
  year: "1986",
  rating: "7.0",
  role: "Actor",
  type: "Known For",
  coverImage: "https://example.com/poster.jpg"
}

REQUIREMENTS:
1. Display coverImage as the main visual (16:9 aspect ratio)
2. If no coverImage, show a Film icon placeholder with gradient background
3. Overlay rating badge (⭐ 7.0) in top-right corner
4. Show title below poster (bold, 18px)
5. Show year and role below title (gray, 14px)
6. Add hover effect: scale(1.05) + larger shadow + overlay with Eye icon
7. Make entire card clickable
8. Use Tailwind CSS with modern shadows and transitions

COMPONENT: src/components/ProfileResultCard.tsx
SECTION: Featured Work (around line 400-500)

Make it look professional like Netflix or Spotify cards.
```

---

## 🎯 **PRIORITY 2: Create Project Details Modal**

```
CONTEXT:
When users click a Featured Work or Projects card, it should open a modal
showing detailed information about the movie/project.

REQUIREMENTS:
1. Full-screen modal with dark backdrop (bg-black/70)
2. White content card centered (max-width: 600px)
3. Layout:
   - Top: Large movie poster (coverImage) - 400px width
   - Below: Title as h2 (24px, bold)
   - Grid (2x2) with icon cards for: Year, Role, Type, Rating
   - Bottom: "View on IMDB" button (primary blue)
   - Top-right: Close X button
4. Smooth animations: fade-in backdrop, slide-up content
5. Click outside or X button to close
6. Mobile responsive (smaller poster on mobile)

DATA PROPS:
{
  title: string,
  coverImage: string,
  year: string,
  role: string,
  type: string,
  rating: string
}

CREATE NEW FILE: src/components/ProjectModal.tsx
Use Shadcn UI Dialog component
Make it beautiful and professional
```

---

## 🖼️ **PRIORITY 3: Full-Screen Photo Gallery**

```
CONTEXT:
The profile has a photo gallery section. Clicking a photo should open
a full-screen lightbox viewer.

CURRENT STATE:
Photos are in a grid, but clicking doesn't do anything yet.

REQUIREMENTS:
1. Full-screen black background
2. Large centered image (max 90vh, 90vw)
3. Navigation:
   - Left/right arrow buttons
   - Keyboard support (← → arrows, ESC to close)
   - Touch swipe on mobile
4. Bottom thumbnail strip (scrollable horizontally)
5. Photo counter: "3 / 10" in top-left
6. Download button in top-right
7. Close X button in top-right
8. Smooth transitions when changing photos
9. Click outside image to close

PROPS:
{
  photos: string[] (array of image URLs),
  initialIndex: number (which photo to show first),
  isOpen: boolean,
  onClose: () => void
}

CREATE NEW FILE: src/components/PhotoGalleryModal.tsx
Use modern UI/UX patterns like Unsplash or Pinterest
```

---

## 📱 **PRIORITY 4: Mobile Responsiveness**

```
CONTEXT:
The profile card needs to work perfectly on all screen sizes.

CURRENT PROBLEM:
Layout breaks on mobile, text is too small, cards are cramped.

REQUIREMENTS BY BREAKPOINT:

Mobile (320px - 640px):
- Profile photo: 28px diameter
- Featured Work: 1 column grid
- Projects: 1 column grid
- Photos: 2 columns grid
- Font sizes: 14px body, 18px headings
- Padding: 16px
- Touch targets: minimum 44px

Tablet (640px - 1024px):
- Profile photo: 36px diameter
- Featured Work: 2 columns
- Projects: 2 columns
- Photos: 3 columns
- Font sizes: 16px body, 20px headings
- Padding: 20px

Desktop (1024px+):
- Profile photo: 40px diameter
- Featured Work: 3 columns
- Projects: 3 columns
- Photos: 4 columns
- Font sizes: 16px body, 24px headings
- Padding: 24px

TEST ON:
- iPhone SE (375px)
- iPad (768px)
- Desktop (1920px)

Update: src/components/ProfileResultCard.tsx
Use Tailwind responsive prefixes: sm:, md:, lg:, xl:
```

---

## ✨ **PRIORITY 5: Professional Card Styling**

```
CONTEXT:
All cards in the profile (Featured Work, Projects, Personal Details) need
a modern, professional look.

DESIGN SYSTEM:

Colors:
- Primary: Blue gradient (from-blue-500 to-blue-600)
- Accent: Purple (accent/10 for backgrounds)
- Text: Gray-900 for headings, Gray-600 for body
- Background: White cards with subtle shadows

Effects:
- Glassmorphism: backdrop-blur-sm + bg-white/90
- Shadows: Multiple layers for depth
  - Base: shadow-md
  - Hover: shadow-xl-premium (custom, larger)
- Transitions: all 300ms ease-out
- Hover lift: transform translate-y-(-4px)

Cards:
- Border radius: rounded-xl (12px)
- Padding: p-5 or p-6
- Border: border border-gray-200
- Hover: border-primary/30

Typography:
- Headings: font-bold
- Body: font-normal
- Small text: text-sm text-gray-600

APPLY TO:
- Featured Work cards
- Projects cards
- Personal Details section
- Skills section
- Modal dialogs

Make it look like modern SaaS products (Linear, Vercel, Stripe)
```

---

## 🎬 **PRIORITY 6: Remove "N/A" and Clean UI**

```
CONTEXT:
The profile shows "N/A" when data is missing. This looks unprofessional.

REQUIREMENTS:
1. NEVER display "N/A" text
2. If a field has no data, hide the entire element
3. Example fixes:
   - If no rating: Don't show rating badge
   - If no role: Don't show role text
   - If no year: Don't show year
4. Use conditional rendering:
   {value && value !== 'N/A' && (<div>{value}</div>)}

ALSO REMOVE:
- "Credit" label in Projects section
- "as" label before role names
- Any other meaningless labels

APPLY TO:
- Featured Work cards
- Projects list
- Personal Details
- All sections of ProfileResultCard.tsx

Make it clean and minimal - show only meaningful information.
```

---

## 🚀 **BONUS: Performance Optimization**

```
OPTIONAL BUT RECOMMENDED:

1. Lazy load images:
   <img loading="lazy" src={coverImage} />

2. Add skeleton loaders while profile generates:
   Show gray animated placeholders instead of blank screen

3. Optimize bundle size:
   - Code split modals (lazy import)
   - Use dynamic imports for heavy components

4. Add loading states:
   - Spinner while scraping IMDB
   - Shimmer effect on cards

This makes the app feel faster and more professional.
```

---

## 📋 **HOW TO USE THESE PROMPTS**

### **Step 1: Open Lovable**
After transferring your code to the Lovable repo.

### **Step 2: Copy ONE Prompt**
Start with PRIORITY 1 (Fix Featured Work Cards).

### **Step 3: Paste in Lovable Chat**
Lovable AI will read the prompt and generate code.

### **Step 4: Preview**
Check the preview in Lovable's browser.

### **Step 5: Iterate**
If you want changes, use follow-up prompts:
- "Make the hover effect more subtle"
- "Increase card spacing to 24px"
- "Change the primary color to purple"

### **Step 6: Next Prompt**
Move to PRIORITY 2, then 3, etc.

---

## 🎨 **FOLLOW-UP PROMPTS (After Main Changes)**

```
"Preview this in mobile view"
```

```
"Make the animations slower and smoother"
```

```
"Add more padding between elements"
```

```
"Change the color scheme to match our brand: 
Primary: #3B82F6 (blue)
Accent: #8B5CF6 (purple)"
```

```
"Make the modal backdrop darker (80% opacity)"
```

```
"Add a subtle gradient to the card backgrounds"
```

```
"Make the featured work cards wider"
```

```
"Show 4 columns on large screens instead of 3"
```

---

## ✅ **SUCCESS CHECKLIST**

After applying all prompts:

- [ ] Featured Work shows movie posters
- [ ] Hovering cards shows eye icon and scales up
- [ ] Clicking card opens modal with full details
- [ ] Modal shows cover image and all metadata
- [ ] Photo gallery opens full-screen
- [ ] Navigation arrows work in gallery
- [ ] Mobile view looks perfect (test on phone)
- [ ] No "N/A" text anywhere
- [ ] All cards have professional styling
- [ ] Smooth animations throughout
- [ ] Client-demo ready appearance

---

**Pro Tip**: Take screenshots after each change and compare to ensure progress! 📸

