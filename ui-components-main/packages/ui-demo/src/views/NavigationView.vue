<template>
  <component-demo-layout
    class="navigation-view"
    name="Navigation"
  >
    <section-header
      title="Overview"
      description="The PNavigation component provides a responsive sidebar navigation with support for nested items, custom colors, icons, and footer actions. It automatically collapses on smaller screens and shows a mobile menu."
    />

    <section-header title="Key Features" />
    <p-card>
      <div class="features-list">
        <ul>
          <li><strong>Responsive Design:</strong> Automatically adapts to mobile, tablet, and desktop viewports</li>
          <li><strong>Nested Navigation:</strong> Support for hierarchical menu structures with expandable groups</li>
          <li><strong>Custom Colors:</strong> Each navigation group can have its own accent color</li>
          <li><strong>Icon Support:</strong> FontAwesome icons with customizable families and styles</li>
          <li><strong>Collapsed Labels:</strong> Short labels for compact display on smaller screens</li>
          <li><strong>Footer Actions:</strong> Add action buttons at the bottom using <code>p-navigation-action</code></li>
          <li><strong>Vue Router Integration:</strong> Built-in support for router links</li>
        </ul>
      </div>
    </p-card>

    <section-header title="Navigation Item Properties" />
    <p-card>
      <div class="properties-table">
        <h4>Top-Level Item Properties:</h4>
        <table>
          <thead>
            <tr>
              <th>Property</th>
              <th>Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>label</code></td>
              <td>string</td>
              <td>Display name for the navigation section</td>
            </tr>
            <tr>
              <td><code>collapsedLabel</code></td>
              <td>string</td>
              <td>Short label shown when navigation is collapsed</td>
            </tr>
            <tr>
              <td><code>color</code></td>
              <td>string</td>
              <td>Hex color for the section (e.g., "#FF54D9")</td>
            </tr>
            <tr>
              <td><code>icon</code></td>
              <td>string</td>
              <td>FontAwesome icon name</td>
            </tr>
            <tr>
              <td><code>family</code></td>
              <td>IconFamily</td>
              <td>Icon family: "classic", "duotone", "sharp", "kit", etc.</td>
            </tr>
            <tr>
              <td><code>faStyle</code></td>
              <td>FaStyle</td>
              <td>Icon style: "solid", "regular", "light", "thin", "brands"</td>
            </tr>
            <tr>
              <td><code>items</code></td>
              <td>array</td>
              <td>Nested navigation items</td>
            </tr>
          </tbody>
        </table>

        <h4 class="mt-lg">Nested Item Properties:</h4>
        <table>
          <thead>
            <tr>
              <th>Property</th>
              <th>Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>label</code></td>
              <td>string</td>
              <td>Display name for the menu item</td>
            </tr>
            <tr>
              <td><code>icon</code></td>
              <td>string</td>
              <td>FontAwesome icon name</td>
            </tr>
            <tr>
              <td><code>family</code></td>
              <td>IconFamily</td>
              <td>Icon family: "classic", "duotone", "sharp", "kit", etc.</td>
            </tr>
            <tr>
              <td><code>faStyle</code></td>
              <td>FaStyle</td>
              <td>Icon style: "solid", "regular", "light", "thin", "brands"</td>
            </tr>
            <tr>
              <td><code>to</code></td>
              <td>object</td>
              <td>Vue Router location object (e.g., { name: 'home' })</td>
            </tr>
          </tbody>
        </table>
      </div>
    </p-card>
  </component-demo-layout>
</template>

<script lang="ts" setup></script>

<style>
.features-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.features-list li {
  padding: var(--spacing-sm) 0;
  line-height: 1.6;
}

.properties-table {
  padding: var(--spacing-md);
}

.properties-table h4 {
  margin-bottom: var(--spacing-sm);
  font-size: var(--font-size-md);
  font-weight: 600;
}

.properties-table table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: var(--spacing-md);
}

.properties-table th,
.properties-table td {
  padding: var(--spacing-sm);
  text-align: left;
  border-bottom: 1px solid var(--border-color);
}

.properties-table th {
  font-weight: 600;
  background-color: var(--background-secondary);
}

.properties-table code {
  background-color: var(--background-secondary);
  padding: 2px 6px;
  border-radius: 3px;
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
}

.mt-lg {
  margin-top: var(--spacing-lg);
}
</style>
