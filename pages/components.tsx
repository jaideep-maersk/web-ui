import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import type { NextPage } from 'next';
import {
  Button,
  Input,
  Modal,
  Badge,
  Checkbox,
  Spinner,
  Tooltip,
  Dropdown,
  Collapsible,
  ConfirmDialog,
  Pagination,
  Card,
  Tabs,
  Textarea,
  Toggle,
  RadioGroup,
  Avatar,
  Drawer,
  Selector,
  Banner,
  Overlay,
  InputModal,
  Switch,
  Image,
  Emoji,
  EmojiPicker,
  FileItem,
  ProgressBar,
  CircularProgress,
  HotkeyHint,
  Marquee,
  ImagePreview,
  FileItemModal,
  SensitiveInput,
  Tags,
  TagInput,
  RichTextInput,
  FormattingButtons,
  CodeEditor,
  CodeEditorModal,
  Sidebar,
  ChatList,
  SlideShow,
  SVGPanZoom,
  FullHeightIframe,
  DropdownOptions,
  ToolCallDisplay,
  type Tag,
  type ChatItem,
  type DropdownOption,
  type ToolCall,
} from '@/components/ui';

const ComponentsShowcase: NextPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [showInputModal, setShowInputModal] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [showFileModal, setShowFileModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isToggled, setIsToggled] = useState(false);
  const [isSwitched, setIsSwitched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDropdown, setSelectedDropdown] = useState('');
  const [selectedSelector, setSelectedSelector] = useState('');
  const [selectedRadio, setSelectedRadio] = useState('option1');
  const [selectedEmoji, setSelectedEmoji] = useState('');
  const [progressValue, setProgressValue] = useState(45);
  const [password, setPassword] = useState('');
  const [tags, setTags] = useState<Tag[]>([
    { name: 'React' },
    { name: 'TypeScript' },
    { name: 'Next.js' },
  ]);
  const [richText, setRichText] = useState('# Hello World\n\nThis is a **bold** example.');
  const [code, setCode] = useState('function hello() {\n  console.log("Hello World!");\n}');
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedChat, setSelectedChat] = useState('');
  const [svgContent, setSvgContent] = useState('<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg"><circle cx="100" cy="100" r="80" fill="#3b82f6"/><circle cx="100" cy="100" r="50" fill="#ffffff"/></svg>');

  const chatItems: ChatItem[] = [
    { id: '1', title: 'First Chat', timestamp: '2 hours ago', unread: 3, active: selectedChat === '1' },
    { id: '2', title: 'Second Chat', timestamp: '1 day ago', unread: 0, active: selectedChat === '2' },
    { id: '3', title: 'Third Chat', timestamp: '3 days ago', unread: 1, active: selectedChat === '3' },
  ];

  const slideImages = [
    'https://via.placeholder.com/800x400/3b82f6/ffffff?text=Slide+1',
    'https://via.placeholder.com/800x400/8b5cf6/ffffff?text=Slide+2',
    'https://via.placeholder.com/800x400/ec4899/ffffff?text=Slide+3',
  ];

  const dropdownMenuOptions: DropdownOption[] = [
    { id: 'edit', label: 'Edit', icon: <span>✏️</span> },
    { id: 'copy', label: 'Copy', icon: <span>📋</span> },
    { id: 'divider', label: '', divider: true },
    { id: 'delete', label: 'Delete', icon: <span>🗑️</span>, danger: true },
  ];

  const toolCall: ToolCall = {
    id: '1',
    name: 'calculate_sum',
    arguments: { a: 5, b: 3 },
    result: 8,
    status: 'success',
    timestamp: '10:30 AM',
  };

  const dropdownOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  const selectorOptions = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'orange', label: 'Orange' },
    { value: 'grape', label: 'Grape' },
  ];

  const radioOptions = [
    { value: 'option1', label: 'Option 1', description: 'This is the first option' },
    { value: 'option2', label: 'Option 2', description: 'This is the second option' },
    { value: 'option3', label: 'Option 3', description: 'This is the third option' },
  ];

  const tabs = [
    {
      id: 'tab1',
      label: 'First Tab',
      content: <p>Content for the first tab</p>,
    },
    {
      id: 'tab2',
      label: 'Second Tab',
      content: <p>Content for the second tab</p>,
    },
    {
      id: 'tab3',
      label: 'Third Tab',
      content: <p>Content for the third tab</p>,
    },
  ];

  return (
    <>
      <Head>
        <title>Components Showcase - Open WebUI</title>
      </Head>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Banner at top */}
        {showBanner && (
          <Banner
            type="success"
            content="Phase 2 Session 5 Complete! 49 components now available - Tier 4: 100% COMPLETE! 🎉"
            dismissible
            onDismiss={() => setShowBanner(false)}
          />
        )}
        
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Component Library Showcase
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Phase 2: 49 React components migrated from Svelte (Sessions 1-5) - Tier 4 COMPLETE! ✅
              </p>
            </div>
            <Link
              href="/"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </header>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
          {/* Badges */}
          <Card title="Badges">
            <div className="flex flex-wrap gap-2">
              <Badge type="info" content="Info" />
              <Badge type="success" content="Success" />
              <Badge type="warning" content="Warning" />
              <Badge type="error" content="Error" />
              <Badge type="muted" content="Muted" />
            </div>
          </Card>

          {/* Buttons */}
          <Card title="Buttons">
            <div className="flex flex-wrap gap-4">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="ghost">Ghost</Button>
              <Button disabled>Disabled</Button>
              <Button loading>Loading</Button>
            </div>
          </Card>

          {/* Inputs */}
          <Card title="Form Inputs">
            <div className="space-y-4">
              <Input label="Text Input" placeholder="Enter text..." />
              <Input label="Email" type="email" placeholder="email@example.com" />
              <Input label="With Error" error="This field is required" />
              <Input label="With Helper" helperText="This is a helper text" />
              <Textarea label="Textarea" placeholder="Enter multiple lines..." rows={4} />
            </div>
          </Card>

          {/* Checkbox & Toggle */}
          <Card title="Checkbox & Toggle">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Checkbox
                  state={isChecked ? 'checked' : 'unchecked'}
                  onChange={(state) => setIsChecked(state === 'checked')}
                />
                <span>Checkbox (checked: {isChecked.toString()})</span>
              </div>
              <Toggle
                label="Toggle Switch"
                checked={isToggled}
                onChange={setIsToggled}
              />
            </div>
          </Card>

          {/* Radio Group */}
          <Card title="Radio Group">
            <RadioGroup
              label="Select an option"
              options={radioOptions}
              value={selectedRadio}
              onChange={setSelectedRadio}
            />
          </Card>

          {/* Dropdown */}
          <Card title="Dropdown">
            <Dropdown
              options={dropdownOptions}
              value={selectedDropdown}
              onChange={setSelectedDropdown}
              placeholder="Select an option..."
              className="max-w-xs"
            />
          </Card>

          {/* Tabs */}
          <Card title="Tabs">
            <Tabs tabs={tabs} />
          </Card>

          {/* Collapsible */}
          <Card title="Collapsible">
            <div className="space-y-2">
              <Collapsible title="Click to expand" defaultOpen>
                <p className="text-gray-600 dark:text-gray-400">
                  This content is collapsible. Click the header to toggle.
                </p>
              </Collapsible>
              <Collapsible title="Another collapsible section">
                <p className="text-gray-600 dark:text-gray-400">
                  This one starts collapsed.
                </p>
              </Collapsible>
            </div>
          </Card>

          {/* Pagination */}
          <Card title="Pagination">
            <Pagination
              currentPage={currentPage}
              totalPages={10}
              onPageChange={setCurrentPage}
            />
          </Card>

          {/* Tooltip */}
          <Card title="Tooltip">
            <div className="flex gap-4">
              <Tooltip content="This is a tooltip" position="top">
                <Button>Hover me (top)</Button>
              </Tooltip>
              <Tooltip content="Bottom tooltip" position="bottom">
                <Button variant="secondary">Hover me (bottom)</Button>
              </Tooltip>
            </div>
          </Card>

          {/* Avatars */}
          <Card title="Avatars">
            <div className="flex items-center gap-4">
              <Avatar name="John Doe" size="xs" />
              <Avatar name="John Doe" size="sm" />
              <Avatar name="John Doe" size="md" />
              <Avatar name="John Doe" size="lg" />
              <Avatar name="John Doe" size="xl" />
            </div>
          </Card>

          {/* Spinner */}
          <Card title="Loading Spinner">
            <div className="flex items-center gap-4">
              <Spinner size="sm" />
              <Spinner size="md" />
              <Spinner size="lg" />
            </div>
          </Card>

          {/* Modal & ConfirmDialog */}
          <Card title="Modal & Dialog">
            <div className="flex gap-4 flex-wrap">
              <Button onClick={() => setShowModal(true)}>Open Modal</Button>
              <Button variant="danger" onClick={() => setShowConfirm(true)}>
                Open Confirm Dialog
              </Button>
              <Button variant="secondary" onClick={() => setShowInputModal(true)}>
                Open Input Modal
              </Button>
              <Button variant="ghost" onClick={() => setShowDrawer(true)}>
                Open Drawer
              </Button>
            </div>
          </Card>

          {/* NEW: Tier 3 Components */}
          <Card title="🆕 Selector (Enhanced Dropdown)">
            <Selector
              value={selectedSelector}
              onChange={setSelectedSelector}
              options={selectorOptions}
              placeholder="Select a fruit..."
              searchEnabled
              searchPlaceholder="Search fruits..."
              className="max-w-xs"
            />
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Selected: {selectedSelector || 'None'}
            </p>
          </Card>

          <Card title="🆕 Switch Component">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Switch checked={isSwitched} onChange={setIsSwitched} size="sm" />
                <span>Small</span>
              </div>
              <div className="flex items-center gap-4">
                <Switch checked={isSwitched} onChange={setIsSwitched} size="md" />
                <span>Medium (checked: {isSwitched.toString()})</span>
              </div>
              <div className="flex items-center gap-4">
                <Switch checked={isSwitched} onChange={setIsSwitched} size="lg" />
                <span>Large</span>
              </div>
            </div>
          </Card>

          <Card title="🆕 Image Component">
            <Image
              src="https://via.placeholder.com/300x200"
              alt="Placeholder image"
              enablePreview
            />
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Click image to preview
            </p>
          </Card>

          <Card title="🆕 Emoji & Emoji Picker">
            <div className="space-y-4">
              <div className="flex gap-2">
                <Emoji shortCode=":smile:" />
                <Emoji shortCode=":heart:" />
                <Emoji shortCode=":fire:" />
                <Emoji shortCode=":thumbsup:" />
              </div>
              <EmojiPicker onSelect={(emoji) => setSelectedEmoji(emoji)} />
              {selectedEmoji && <p className="text-sm">Last: {selectedEmoji}</p>}
            </div>
          </Card>

          <Card title="🆕 File Item">
            <div className="space-y-2">
              <FileItem
                name="document.pdf"
                size="1024000"
                type="application/pdf"
                onDelete={() => alert('File deleted')}
              />
              <FileItem
                name="image.png"
                size="512000"
                type="image/png"
                onClick={() => alert('File clicked')}
              />
            </div>
          </Card>

          <Card title="🆕 Progress Bars">
            <div className="space-y-6">
              <div>
                <ProgressBar value={progressValue} showLabel />
                <ProgressBar value={75} variant="success" className="mt-2" />
              </div>
              <div className="flex gap-4">
                <CircularProgress value={progressValue} />
                <CircularProgress value={75} variant="success" />
              </div>
              <Button size="sm" onClick={() => setProgressValue((progressValue + 10) % 100)}>
                +10%
              </Button>
            </div>
          </Card>

          {/* Session 3 Components */}
          <Card title="🆕 Hotkey Hint (Session 3)">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-sm">Save:</span>
                <HotkeyHint keys={['mod', 's']} />
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm">Copy:</span>
                <HotkeyHint keys={['mod', 'c']} />
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm">Paste:</span>
                <HotkeyHint keys={['mod', 'v']} />
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm">Delete:</span>
                <HotkeyHint keys={['mod', 'shift', 'Delete']} />
              </div>
            </div>
          </Card>

          <Card title="🆕 Marquee (Session 3)">
            <div className="space-y-4">
              <Marquee
                words={['Welcome to Open WebUI', 'Next.js + TypeScript', 'Phase 2 Complete!', 'Component Library']}
                duration={3000}
                className="text-lg font-semibold text-blue-600 dark:text-blue-400"
              />
              <Marquee
                words={['Fast', 'Reliable', 'Modern', 'Accessible']}
                duration={2000}
                className="text-sm text-gray-600 dark:text-gray-400"
              />
            </div>
          </Card>

          <Card title="🆕 Image Preview (Session 3)">
            <div className="space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Click the button below to open an image in full-screen preview with zoom and pan capabilities.
              </p>
              <Button onClick={() => setShowImagePreview(true)}>
                Open Image Preview
              </Button>
            </div>
          </Card>

          <Card title="🆕 File Item Modal (Session 3)">
            <div className="space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Click the button to see a file detail modal with content preview and metadata.
              </p>
              <Button onClick={() => setShowFileModal(true)}>
                Open File Modal
              </Button>
            </div>
          </Card>

          {/* Tier 4 Components - Session 4 */}
          <div className="col-span-full">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-b-2 border-blue-500 pb-2">
              🆕 Tier 4: Data Display & Advanced Components (Session 4)
            </h2>
          </div>

          <Card title="🆕 Sensitive Input (Session 4)">
            <div className="space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Password input with show/hide toggle for secure data entry.
              </p>
              <SensitiveInput
                value={password}
                onChange={setPassword}
                placeholder="Enter password..."
                label="Password"
              />
              <p className="text-xs text-gray-500">Current value: {password ? '••••••' : '(empty)'}</p>
            </div>
          </Card>

          <Card title="🆕 Tags System (Session 4)">
            <div className="space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Complete tag system with add/remove functionality.
              </p>
              <Tags
                tags={tags}
                onAdd={(tagName) => setTags([...tags, { name: tagName }])}
                onDelete={(tagName) => setTags(tags.filter((t) => t.name !== tagName))}
                placeholder="Add a tag..."
              />
              <div className="pt-2">
                <TagInput
                  onAdd={(tagName) => setTags([...tags, { name: tagName }])}
                  placeholder="Add Tag"
                />
              </div>
            </div>
          </Card>

          <Card title="🆕 Rich Text Input (Session 4)">
            <div className="space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                WYSIWYG/Markdown editor with formatting toolbar.
              </p>
              <RichTextInput
                value={richText}
                onChange={setRichText}
                label="Content"
                placeholder="Write something..."
                showToolbar={true}
              />
            </div>
          </Card>

          <Card title="🆕 Formatting Buttons (Session 4)">
            <div className="space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Standalone formatting toolbar for text editors.
              </p>
              <FormattingButtons
                onFormat={(format) => alert(`Format: ${format}`)}
              />
            </div>
          </Card>

          {/* Session 5: Tier 4 Complete! */}
          <div className="col-span-full">
            <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-2">🎉 Session 5: Tier 4 Complete!</h2>
              <p className="text-lg">9 new components added - Total: 49 components (9.8%)</p>
            </div>
          </div>

          <Card title="🆕 Code Editor (Session 5)">
            <div className="space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Syntax highlighting code editor with tab support and auto-resize.
              </p>
              <CodeEditor
                value={code}
                onChange={setCode}
                language="javascript"
                placeholder="Enter your code..."
              />
              <div className="flex gap-2">
                <Button onClick={() => setShowCodeModal(true)} size="sm">
                  Open in Modal
                </Button>
              </div>
            </div>
          </Card>

          <Card title="🆕 Sidebar (Session 5)">
            <div className="space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Navigation sidebar that slides in from left or right.
              </p>
              <Button onClick={() => setShowSidebar(true)}>
                Open Sidebar
              </Button>
            </div>
          </Card>

          <Card title="🆕 Chat List (Session 5)">
            <div className="space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                List of chat conversations with unread indicators.
              </p>
              <ChatList
                items={chatItems}
                onSelectChat={(id) => setSelectedChat(id)}
                onDeleteChat={(id) => alert(`Delete chat ${id}`)}
              />
            </div>
          </Card>

          <Card title="🆕 SlideShow (Session 5)">
            <div className="space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Image carousel with controls and indicators.
              </p>
              <SlideShow
                images={slideImages}
                autoPlay={false}
                showControls={true}
                showIndicators={true}
              />
            </div>
          </Card>

          <Card title="🆕 SVG Pan & Zoom (Session 5)">
            <div className="space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Interactive SVG viewer with zoom, pan, and reset controls.
              </p>
              <SVGPanZoom
                svgContent={svgContent}
                width="100%"
                height={300}
              />
            </div>
          </Card>

          <Card title="🆕 Full Height Iframe (Session 5)">
            <div className="space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Full-height iframe wrapper for embedding external content.
              </p>
              <FullHeightIframe
                src="https://example.com"
                title="Example Site"
                minHeight="300px"
                sandbox="allow-scripts allow-same-origin"
              />
            </div>
          </Card>

          <Card title="🆕 Dropdown Options (Session 5)">
            <div className="space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Advanced dropdown menu with icons, dividers, and danger actions.
              </p>
              <DropdownOptions
                trigger={
                  <Button variant="secondary">
                    Options ▾
                  </Button>
                }
                options={dropdownMenuOptions}
                onSelect={(id) => alert(`Selected: ${id}`)}
                position="right"
              />
            </div>
          </Card>

          <Card title="🆕 Tool Call Display (Session 5)">
            <div className="space-y-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Display tool/function calls with arguments, results, and status.
              </p>
              <ToolCallDisplay
                toolCall={toolCall}
                expandedByDefault={true}
              />
              <ToolCallDisplay
                toolCall={{
                  id: '2',
                  name: 'fetch_data',
                  arguments: { url: 'https://api.example.com/data' },
                  status: 'pending',
                }}
                expandedByDefault={false}
              />
            </div>
          </Card>
        </div>

        {/* Code Editor Modal */}
        <CodeEditorModal
          isOpen={showCodeModal}
          onClose={() => setShowCodeModal(false)}
          value={code}
          onChange={setCode}
          title="Edit Code"
          language="javascript"
          onSave={() => alert('Code saved!')}
        />

        {/* Sidebar */}
        <Sidebar
          isOpen={showSidebar}
          onClose={() => setShowSidebar(false)}
          position="left"
        >
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Sidebar Menu</h2>
            <nav className="space-y-2">
              <a href="#" className="block p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                Home
              </a>
              <a href="#" className="block p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                Settings
              </a>
              <a href="#" className="block p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                Profile
              </a>
            </nav>
          </div>
        </Sidebar>

        {/* Image Preview Modal */}
        <ImagePreview
          show={showImagePreview}
          src="https://picsum.photos/1200/800"
          alt="Sample Image"
          onClose={() => setShowImagePreview(false)}
        />

        {/* File Item Modal */}
        <FileItemModal
          show={showFileModal}
          onClose={() => setShowFileModal(false)}
          file={{
            name: 'example-document.txt',
            size: 2048,
            type: 'file',
            content: 'This is a sample file content.\n\nIt demonstrates the FileItemModal component with multiple lines of text.\n\nYou can add more content here to see how it handles longer documents.\n\nThe modal supports different file types:\n- Text files\n- Code files\n- Images\n- PDFs\n- Audio files\n\nAnd much more!',
            created_at: Math.floor(Date.now() / 1000),
            meta: {
              content_type: 'text/plain',
            },
          }}
        />

        {/* Modal */}
        <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Example Modal" size="md">
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-300">
              This is an example modal with custom content.
            </p>
            <Input label="Name" placeholder="Enter your name..." />
            <div className="flex gap-2 justify-end">
              <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
              <Button onClick={() => setShowModal(false)}>Save</Button>
            </div>
          </div>
        </Modal>

        {/* Confirm Dialog */}
        <ConfirmDialog
          isOpen={showConfirm}
          onClose={() => setShowConfirm(false)}
          onConfirm={() => console.log('Confirmed!')}
          title="Confirm Action"
          message="Are you sure you want to perform this action? This cannot be undone."
          variant="danger"
          confirmText="Yes, delete"
          cancelText="Cancel"
        />

        {/* Input Modal */}
        <InputModal
          isOpen={showInputModal}
          onClose={() => setShowInputModal(false)}
          onConfirm={(value) => alert(`Entered: ${value}`)}
          title="Enter Value"
          placeholder="Type something..."
        />

        {/* Drawer */}
        <Drawer isOpen={showDrawer} onClose={() => setShowDrawer(false)}>
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Drawer Content</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              This is a drawer that slides up from the bottom.
            </p>
            <Button onClick={() => setShowDrawer(false)}>Close Drawer</Button>
          </div>
        </Drawer>
      </div>
    </>
  );
};

export default ComponentsShowcase;
