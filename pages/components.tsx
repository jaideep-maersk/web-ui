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
} from '@/components/ui';

const ComponentsShowcase: NextPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isToggled, setIsToggled] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDropdown, setSelectedDropdown] = useState('');
  const [selectedRadio, setSelectedRadio] = useState('option1');

  const dropdownOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
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
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Component Library Showcase
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Phase 2: 17 React components migrated from Svelte
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
            <div className="flex gap-4">
              <Button onClick={() => setShowModal(true)}>Open Modal</Button>
              <Button variant="danger" onClick={() => setShowConfirm(true)}>
                Open Confirm Dialog
              </Button>
            </div>
          </Card>
        </div>

        {/* Modal */}
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title="Example Modal"
          size="md"
        >
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-300">
              This is an example modal with custom content.
            </p>
            <Input label="Name" placeholder="Enter your name..." />
            <div className="flex gap-2 justify-end">
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
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
      </div>
    </>
  );
};

export default ComponentsShowcase;
