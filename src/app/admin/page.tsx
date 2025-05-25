'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  TableCellsIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import { Spinner } from '@/components/Spinner';

const sections = [
  {
    name: 'Pet Stories',
    sheet: 'Stories',
    fields: ['Title', 'Author', 'Preview', 'Date', 'Image URL'],
    icon: TableCellsIcon,
  },
  {
    name: 'Tips & Tricks',
    sheet: 'Tips',
    fields: ['Title', 'Description', 'Category'],
    icon: TableCellsIcon,
  },
  {
    name: 'Veterinary Clinics',
    sheet: 'Vets',
    fields: ['Name', 'Address', 'Phone', 'Hours', 'Specialties', 'Rating', 'Image URL'],
    icon: TableCellsIcon,
  },
  {
    name: 'Pet-Friendly Places',
    sheet: 'Places',
    fields: ['Name', 'Type', 'Address', 'Features', 'Rating', 'Description', 'Image URL'],
    icon: TableCellsIcon,
  },
];

export default function AdminPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState(sections[0]);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<any>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/data?sheet=${activeSection.sheet}`);
      const result = await response.json();
      setData(result.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [activeSection.sheet]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleEdit = (data: any) => {
    setEditData(data);
    setIsEditing(true);
  };

  const handleSave = async (formData: any) => {
    try {
      const values = activeSection.fields.map(field => formData[field]);
      
      if (editData?.rowIndex) {
        // Update existing record
        await fetch('/api/data', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sheet: activeSection.sheet,
            rowIndex: editData.rowIndex,
            values,
          }),
        });
      } else {
        // Add new record
        await fetch('/api/data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sheet: activeSection.sheet,
            values,
          }),
        });
      }

      setIsEditing(false);
      setEditData(null);
      fetchData();
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const handleDelete = async (rowIndex: number) => {
    try {
      await fetch(`/api/data?sheet=${activeSection.sheet}&rowIndex=${rowIndex}`, {
        method: 'DELETE',
      });
      fetchData();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner />
        </div>
      ) : (
        <div className="pt-24 pb-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Admin Dashboard</h1>
              <p className="mt-2 text-lg leading-8 text-gray-600">
                Manage your website content
              </p>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-4">
              {/* Sidebar Navigation */}
              <div className="lg:col-span-1">
                <nav className="space-y-1">
                  {sections.map((section) => (
                    <button
                      key={section.name}
                      onClick={() => setActiveSection(section)}
                      className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                        activeSection.name === section.name
                          ? 'bg-indigo-50 text-indigo-600'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <section.icon className="mr-3 h-6 w-6" />
                      {section.name}
                    </button>
                  ))}
                </nav>

                <div className="mt-8">
                  <button
                    onClick={() => handleEdit({})}
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    <PlusIcon className="mr-2 h-5 w-5" />
                    Add New {activeSection.name}
                  </button>
                </div>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-3">
                <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-lg">
                  <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      {activeSection.name} Data
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Edit or update your {activeSection.name.toLowerCase()} information
                    </p>
                  </div>

                  {/* Data Table */}
                  <div className="border-t border-gray-200">
                    <div className="px-4 py-5 sm:p-6">
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-300">
                          <thead>
                            <tr>
                              {activeSection.fields.map((field) => (
                                <th
                                  key={field}
                                  scope="col"
                                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                >
                                  {field}
                                </th>
                              ))}
                              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                <span className="sr-only">Actions</span>
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {data.map((row, rowIndex) => (
                              <tr key={rowIndex}>
                                {activeSection.fields.map((field, fieldIndex) => (
                                  <td
                                    key={field}
                                    className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                                  >
                                    {row[fieldIndex]}
                                  </td>
                                ))}
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  <div className="flex items-center gap-x-4">
                                    <button
                                      onClick={() => handleEdit({ ...row, rowIndex: rowIndex + 2 })}
                                      className="text-indigo-600 hover:text-indigo-900"
                                    >
                                      <PencilIcon className="h-5 w-5" />
                                    </button>
                                    <button
                                      onClick={() => handleDelete(rowIndex + 2)}
                                      className="text-red-600 hover:text-red-900"
                                    >
                                      <TrashIcon className="h-5 w-5" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Edit Modal */}
          {isEditing && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
              <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
                <h3 className="text-lg font-medium mb-4">
                  {editData ? 'Edit' : 'Add'} {activeSection.name}
                </h3>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const formData = Object.fromEntries(
                    new FormData(e.target as HTMLFormElement)
                  );
                  handleSave(formData);
                }}>
                  <div className="space-y-4">
                    {activeSection.fields.map((field) => (
                      <div key={field}>
                        <label className="block text-sm font-medium text-gray-700">
                          {field}
                        </label>
                        <input
                          type="text"
                          name={field}
                          defaultValue={editData?.[activeSection.fields.indexOf(field)] || ''}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          placeholder={`Enter ${field.toLowerCase()}`}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex justify-end gap-x-4">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-md"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 