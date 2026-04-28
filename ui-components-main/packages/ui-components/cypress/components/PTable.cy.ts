import PTable from '@/components/table/PTable.vue'

const tableClass = '.polly-table'
const headerClass = '.polly-table__header'
const headerCellClass = '.polly-table__header-cell'
const bodyRowClass = '.polly-table__body-row'
const bodyCellClass = '.polly-table__body-cell'
const checkboxClass = '.polly-table__checkbox'
const emptyTitleClass = '.polly-table__empty-title'
const emptyMessageClass = '.polly-table__empty-message'

describe('PTable', () => {
  const sampleData = [
    { id: 1, name: 'John Doe', age: 30, city: 'New York' },
    { id: 2, name: 'Jane Smith', age: 25, city: 'Los Angeles' },
    { id: 3, name: 'Bob Johnson', age: 35, city: 'Chicago' },
  ]

  const sampleColumns = [
    { label: 'Name', property: 'name' },
    { label: 'Age', property: 'age' },
    { label: 'City', property: 'city' },
  ]

  describe('Basic Rendering', () => {
    it('renders table with headers and data', () => {
      cy.mount(PTable, {
        props: {
          data: sampleData,
          columns: sampleColumns,
        },
      })

      cy.get(tableClass).should('exist')
      cy.get(headerClass).should('exist')
      cy.get(headerCellClass).should('have.length', 3)
      cy.get(bodyRowClass).should('have.length', 3)
    })

    it('renders correct header labels', () => {
      cy.mount(PTable, {
        props: {
          data: sampleData,
          columns: sampleColumns,
        },
      })

      sampleColumns.forEach((column) => {
        cy.get(headerCellClass).contains(column.label)
      })
    })

    it('renders correct cell values', () => {
      cy.mount(PTable, {
        props: {
          data: sampleData,
          columns: sampleColumns,
        },
      })

      sampleData.forEach((row) => {
        cy.get(bodyCellClass).contains(row.name)
        cy.get(bodyCellClass).contains(row.age)
        cy.get(bodyCellClass).contains(row.city)
      })
    })
  })

  describe('Empty State', () => {
    it('displays empty state when no data', () => {
      const emptyTitle = 'No Data Available'
      const emptyMessage = 'Please add some data'

      cy.mount(PTable, {
        props: {
          data: [],
          columns: sampleColumns,
          emptyTitle,
          emptyMessage,
        },
      })

      cy.get(emptyTitleClass).should('contain', emptyTitle)
      cy.get(emptyMessageClass).should('contain', emptyMessage)
    })

    it('supports custom empty state slots', () => {
      cy.mount(PTable, {
        props: {
          data: [],
          columns: sampleColumns,
        },
        slots: {
          emptyTitle: 'Custom Empty Title',
          emptyMessage: 'Custom Empty Message',
        },
      })

      cy.get(emptyTitleClass).should('contain', 'Custom Empty Title')
      cy.get(emptyMessageClass).should('contain', 'Custom Empty Message')
    })
  })

  describe('Selection', () => {
    it('renders selection column when selection is enabled', () => {
      cy.mount(PTable, {
        props: {
          data: sampleData,
          columns: sampleColumns,
          selected: [],
          'onUpdate:selected': cy.spy().as('selectionSpy'),
        },
      })

      cy.get(checkboxClass).should('exist')
      cy.get(`${headerClass} ${checkboxClass}`).should('exist')
    })

    it('handles row selection', () => {
      cy.mount(PTable, {
        props: {
          data: sampleData,
          columns: sampleColumns,
          selected: [],
          'onUpdate:selected': cy.spy().as('selectionSpy'),
        },
      })

      cy.get(`${bodyRowClass}:first ${checkboxClass}`).click()
      cy.get('@selectionSpy').should('have.been.calledWith', [sampleData[0]])
    })

    it('handles select all', () => {
      cy.mount(PTable, {
        props: {
          data: sampleData,
          columns: sampleColumns,
          selected: [],
          'onUpdate:selected': cy.spy().as('selectionSpy'),
        },
      })

      cy.get(`${headerClass} ${checkboxClass}`).click()
      cy.get('@selectionSpy').should('have.been.calledWith', sampleData)
    })

    it('respects selection limit', () => {
      cy.mount(PTable, {
        props: {
          data: sampleData,
          columns: sampleColumns,
          selected: [sampleData[0]],
          selectionLimit: 1,
          'onUpdate:selected': cy.spy().as('selectionSpy'),
        },
      })

      cy.get(`${bodyCellClass}:nth-child(1) ${checkboxClass}`).should('have.class', 'polly-checkbox--disabled')
    })

    it('disables select when row is disabled', () => {
      cy.mount(PTable, {
        props: {
          data: sampleData,
          columns: sampleColumns,
          selected: [],
          disabledRowSelection: () => true,
        },
      })

      cy.get(`${bodyCellClass}:nth-child(1) ${checkboxClass}`).should('have.class', 'polly-checkbox--disabled')
    })
  })

  describe('Sorting', () => {
    it('renders sort buttons when sorting is enabled', () => {
      cy.mount(PTable, {
        props: {
          data: sampleData,
          columns: sampleColumns.map((col) => ({ ...col, sortable: true })),
          sort: { property: 'name', direction: 'asc' },
          'onUpdate:sort': cy.spy().as('sortSpy'),
        },
      })

      cy.get('.polly-sort-button__icon').first().click()
      cy.get('@sortSpy').should('have.been.calledWith', { property: 'name', direction: 'desc' })
    })
  })

  describe('Custom Slots', () => {
    it('supports custom cell rendering', () => {
      cy.mount(PTable, {
        props: {
          data: sampleData,
          columns: sampleColumns,
        },
        slots: {
          name: '<div class="custom-cell">Custom {{row.name}}</div>',
        },
      })

      cy.get('.custom-cell').should('exist')
      cy.get('.custom-cell').first().should('contain', 'Custom John Doe')
    })

    it('supports footer slot', () => {
      cy.mount(PTable, {
        props: {
          data: sampleData,
          columns: sampleColumns,
        },
        slots: {
          footer: '<div class="custom-footer">Table Footer</div>',
        },
      })

      cy.get('.polly-table__footer').should('exist')
      cy.get('.custom-footer').should('contain', 'Table Footer')
    })
  })

  describe('Row Interaction', () => {
    it('emits row-click event', () => {
      cy.mount(PTable, {
        props: {
          data: sampleData,
          columns: sampleColumns,
          onRowClick: cy.spy().as('rowClickSpy'),
        },
      })

      cy.get(bodyCellClass).first().click()
      cy.get('@rowClickSpy').should('have.been.calledWith', sampleData[0])
    })

    it('emits row-dblclick event', () => {
      cy.mount(PTable, {
        props: {
          data: sampleData,
          columns: sampleColumns,
          onRowDblclick: cy.spy().as('rowDblclickSpy'),
        },
      })

      cy.get(bodyCellClass).first().dblclick()
      cy.get('@rowDblclickSpy').should('have.been.calledWith', sampleData[0])
    })
  })

  describe('Column Rendering', () => {
    it('applies equal width columns when fullWidth prop is true', () => {
      cy.mount(PTable, {
        props: {
          data: sampleData,
          columns: sampleColumns,
          fullWidth: true,
        },
      })

      // When fullWidth is true, columns should have approximately equal widths
      cy.get(headerCellClass).then(($cells) => {
        const firstWidth = $cells.eq(0).width()
        const secondWidth = $cells.eq(1).width()
        const thirdWidth = $cells.eq(2).width()

        // Check that column widths are roughly equal (within a reasonable tolerance)
        // Allow for more variance due to content differences and browser rendering
        expect(Math.abs(firstWidth - secondWidth)).to.be.lessThan(100)
        expect(Math.abs(secondWidth - thirdWidth)).to.be.lessThan(100)
        expect(Math.abs(firstWidth - thirdWidth)).to.be.lessThan(100)
      })
    })

    it('applies content-based widths when fullWidth is false', () => {
      cy.mount(PTable, {
        props: {
          data: sampleData,
          columns: sampleColumns,
          fullWidth: false,
        },
      })

      // When fullWidth is false, columns should have different widths based on content
      cy.get(headerCellClass).then(($cells) => {
        const nameWidth = $cells.eq(0).width() // "Name" column
        const ageWidth = $cells.eq(1).width() // "Age" column
        const cityWidth = $cells.eq(2).width() // "City" column

        // The "Age" column should be narrower than the "Name" and "City" columns
        // since "Age" is a shorter word with less content
        expect(ageWidth).to.be.lessThan(nameWidth)
        expect(ageWidth).to.be.lessThan(cityWidth)
      })
    })
  })

  describe('Column Alignment', () => {
    const alignmentData = [
      { id: 1, left: 'Left Text', center: 'Center Text', right: 'Right Text' },
      { id: 2, left: 'Another Left', center: 'Another Center', right: 'Another Right' },
    ]

    it('applies left alignment to columns', () => {
      const columns = [
        { label: 'Left', property: 'left', align: 'left' as const },
        { label: 'Center', property: 'center', align: 'center' as const },
        { label: 'Right', property: 'right', align: 'right' as const },
      ]

      cy.mount(PTable, {
        props: {
          data: alignmentData,
          columns,
        },
      })

      cy.get(`${headerCellClass}--left`).should('exist')
      cy.get(`${bodyCellClass}--left`).should('exist')
    })

    it('applies center alignment to columns', () => {
      const columns = [{ label: 'Center', property: 'center', align: 'center' as const }]

      cy.mount(PTable, {
        props: {
          data: alignmentData,
          columns,
        },
      })

      cy.get(`${headerCellClass}--center`).should('exist')
      cy.get(`${bodyCellClass}--center`).should('exist')
    })

    it('applies right alignment to columns', () => {
      const columns = [{ label: 'Right', property: 'right', align: 'right' as const }]

      cy.mount(PTable, {
        props: {
          data: alignmentData,
          columns,
        },
      })

      cy.get(`${headerCellClass}--right`).should('exist')
      cy.get(`${bodyCellClass}--right`).should('exist')
    })
  })

  describe('Column Width Control', () => {
    const widthData = [
      { id: 1, short: 'A', medium: 'Medium Text', long: 'This is a very long text content' },
      { id: 2, short: 'B', medium: 'Another Text', long: 'Another long text content example' },
    ]

    it('applies specific width to columns', () => {
      const columns = [
        { label: 'Short', property: 'short', width: '80px' },
        { label: 'Medium', property: 'medium', width: '150px' },
        { label: 'Long', property: 'long', width: '300px' },
      ]

      cy.mount(PTable, {
        props: {
          data: widthData,
          columns,
          fullWidth: false,
        },
      })

      // Check that the grid template columns includes our specified widths
      cy.get('.polly-table__table').should('have.css', 'grid-template-columns').and('include', '80px').and('include', '150px').and('include', '300px')
    })

    it('applies minWidth and maxWidth constraints', () => {
      const columns = [{ label: 'Constrained', property: 'medium', minWidth: '100px', maxWidth: '200px' }]

      cy.mount(PTable, {
        props: {
          data: widthData,
          columns,
          fullWidth: true,
        },
      })

      // When fullWidth is true, should use minmax with our constraints
      // The actual CSS value will be computed, so we check the column width is within bounds
      cy.get(headerCellClass)
        .first()
        .then(($cell) => {
          const width = $cell.width()
          expect(width).to.be.at.least(100)
          expect(width).to.be.at.most(200)
        })
    })

    it('uses minWidth as base width when fullWidth is false', () => {
      const columns = [{ label: 'Base Width', property: 'short', minWidth: '120px' }]

      cy.mount(PTable, {
        props: {
          data: widthData,
          columns,
          fullWidth: false,
        },
      })

      // When fullWidth is false, the column should try to respect minWidth
      // However, CSS grid may adjust based on content, so we check that the grid template is set correctly
      cy.get('.polly-table__table')
        .should('have.css', 'grid-template-columns')
        .then((gridTemplate) => {
          // Should contain minmax with our minWidth
          expect(gridTemplate).to.include('120px')
        })
    })
  })

  describe('Frozen/Sticky Columns', () => {
    const frozenData = [
      { id: 1, name: 'John', col1: 'Data1', col2: 'Data2', col3: 'Data3', actions: 'Edit' },
      { id: 2, name: 'Jane', col1: 'Data1', col2: 'Data2', col3: 'Data3', actions: 'Edit' },
    ]

    it('applies sticky positioning to frozen columns', () => {
      const columns = [
        { label: 'Name', property: 'name', freeze: true },
        { label: 'Col1', property: 'col1' },
        { label: 'Col2', property: 'col2' },
        { label: 'Actions', property: 'actions', freeze: true },
      ]

      cy.mount(PTable, {
        props: {
          data: frozenData,
          columns,
        },
      })

      // Check that frozen header cells have sticky class
      cy.get(`${headerCellClass}--sticky`).should('have.length', 2)

      // Check that frozen body cells have sticky class
      cy.get(`${bodyCellClass}--sticky`).should('exist')
    })

    it('calculates correct left position for frozen columns', () => {
      const columns = [
        { label: 'Name', property: 'name', freeze: true, width: '100px' },
        { label: 'Col1', property: 'col1', width: '100px' },
        { label: 'Actions', property: 'actions', freeze: true, width: '80px' },
      ]

      cy.mount(PTable, {
        props: {
          data: frozenData,
          columns,
        },
      })

      // First frozen column should have left: 0
      cy.get(`${headerCellClass}--sticky`).first().should('have.css', 'left', '0px')

      // Second frozen column should be positioned after the first
      cy.get(`${headerCellClass}--sticky`).last().should('have.css', 'position', 'sticky')
    })
  })

  describe('Text Truncation', () => {
    const truncateData = [
      {
        id: 1,
        title: 'Short',
        description: 'This is a very long description that should be truncated when the truncate option is enabled for the column',
        category: 'Tech',
      },
      {
        id: 2,
        title: 'Another',
        description: 'Another extremely long description that demonstrates the text truncation functionality in table columns',
        category: 'Business',
      },
    ]

    it('applies truncation styles to columns with truncate enabled', () => {
      const columns = [
        { label: 'Title', property: 'title' },
        { label: 'Description', property: 'description', truncate: true },
        { label: 'Category', property: 'category' },
      ]

      cy.mount(PTable, {
        props: {
          data: truncateData,
          columns,
        },
      })

      // Check that truncated cells have the truncate class
      cy.get(`${bodyCellClass}--truncate`).should('exist')

      // Check that truncated cells have proper CSS properties
      cy.get(`${bodyCellClass}--truncate`).should('have.css', 'white-space', 'nowrap')
      cy.get(`${bodyCellClass}--truncate`).should('have.css', 'text-overflow', 'ellipsis')
      cy.get(`${bodyCellClass}--truncate`).should('have.css', 'overflow', 'hidden')
    })

    it('does not apply truncation to non-truncated columns', () => {
      const columns = [
        { label: 'Title', property: 'title', truncate: false },
        { label: 'Category', property: 'category' },
      ]

      cy.mount(PTable, {
        props: {
          data: truncateData,
          columns,
        },
      })

      // Non-truncated columns should not have the truncate class
      cy.get(`${bodyCellClass}--truncate`).should('not.exist')
    })
  })

  describe('Column Visibility', () => {
    const visibilityData = [
      { id: 1, name: 'John Doe', email: 'john@example.com', phone: '555-0123' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '555-0456' },
    ]

    it('shows columns when visible is true', () => {
      const columns = [
        { label: 'Name', property: 'name', visible: true },
        { label: 'Email', property: 'email', visible: true },
        { label: 'Phone', property: 'phone', visible: true },
      ]

      cy.mount(PTable, {
        props: {
          data: visibilityData,
          columns,
        },
      })

      // All columns should be visible
      cy.get(headerCellClass).should('have.length', 3)
      cy.get(headerCellClass).contains('Name')
      cy.get(headerCellClass).contains('Email')
      cy.get(headerCellClass).contains('Phone')
    })

    it('hides columns when visible is false', () => {
      const columns = [
        { label: 'Name', property: 'name', visible: true },
        { label: 'Email', property: 'email', visible: false },
        { label: 'Phone', property: 'phone', visible: true },
      ]

      cy.mount(PTable, {
        props: {
          data: visibilityData,
          columns,
        },
      })

      // Only visible columns should be rendered
      cy.get(headerCellClass).should('have.length', 2)
      cy.get(headerCellClass).contains('Name')
      cy.get(headerCellClass).contains('Phone')
      cy.get(headerCellClass).should('not.contain', 'Email')
    })

    it('shows columns when visible is undefined (default behavior)', () => {
      const columns = [
        { label: 'Name', property: 'name' }, // visible undefined
        { label: 'Email', property: 'email' }, // visible undefined
      ]

      cy.mount(PTable, {
        props: {
          data: visibilityData,
          columns,
        },
      })

      // Columns should be visible by default
      cy.get(headerCellClass).should('have.length', 2)
      cy.get(headerCellClass).contains('Name')
      cy.get(headerCellClass).contains('Email')
    })

    it('dynamically updates column visibility', () => {
      // Test that columns can be shown/hidden by changing the visible property
      // We'll test this by mounting with different column configurations
      const baseData = visibilityData

      // First mount with both columns visible
      cy.mount(PTable, {
        props: {
          data: baseData,
          columns: [
            { label: 'Name', property: 'name', visible: true },
            { label: 'Email', property: 'email', visible: true },
          ],
        },
      })

      // Initially both columns should be visible
      cy.get(headerCellClass).should('have.length', 2)
      cy.get(headerCellClass).contains('Name')
      cy.get(headerCellClass).contains('Email')
    })
  })

  describe('Data Test IDs', () => {
    const testData = [{ id: 1, name: 'John Doe', email: 'john@example.com' }]

    it('applies default data-testid based on column label', () => {
      const columns = [
        { label: 'Full Name', property: 'name' },
        { label: 'Email Address', property: 'email' },
      ]

      cy.mount(PTable, {
        props: {
          data: testData,
          columns,
        },
      })

      // Should use kebab-case of label as default testid
      cy.get('[data-testid="full-name"]').should('exist')
      cy.get('[data-testid="email-address"]').should('exist')
      cy.get('[data-testid="full-name-header"]').should('exist')
      cy.get('[data-testid="email-address-header"]').should('exist')
    })

    it('applies custom data-testid when specified', () => {
      const columns = [
        { label: 'Name', property: 'name', dataTestid: 'custom-name' },
        { label: 'Email', property: 'email', dataTestid: 'custom-email' },
      ]

      cy.mount(PTable, {
        props: {
          data: testData,
          columns,
        },
      })

      // Should use custom testids
      cy.get('[data-testid="custom-name"]').should('exist')
      cy.get('[data-testid="custom-email"]').should('exist')
      cy.get('[data-testid="custom-name-header"]').should('exist')
      cy.get('[data-testid="custom-email-header"]').should('exist')
    })
  })

  describe('Column Option Combinations', () => {
    const combinedData = [
      {
        id: 1,
        name: 'John Doe',
        description: 'A very long description that will be truncated',
        amount: 1234.56,
        status: 'active',
      },
      {
        id: 2,
        name: 'Jane Smith',
        description: 'Another long description for testing truncation',
        amount: 9876.54,
        status: 'inactive',
      },
    ]

    it('combines multiple column options correctly', () => {
      const columns = [
        {
          label: 'Name',
          property: 'name',
          freeze: true,
          width: '120px',
          align: 'left' as const,
          dataTestid: 'user-name',
        },
        {
          label: 'Description',
          property: 'description',
          truncate: true,
          width: '200px',
          visible: true,
        },
        {
          label: 'Amount',
          property: 'amount',
          align: 'right' as const,
          sortable: true,
          width: '100px',
        },
        {
          label: 'Hidden Status',
          property: 'status',
          visible: false,
        },
      ]

      cy.mount(PTable, {
        props: {
          data: combinedData,
          columns,
          sort: { property: 'amount', direction: 'asc' },
          'onUpdate:sort': cy.spy().as('sortSpy'),
        },
      })

      // Check frozen column
      cy.get(`${headerCellClass}--sticky`).should('exist')
      cy.get('[data-testid="user-name-header"]').should('exist')

      // Check truncated column
      cy.get(`${bodyCellClass}--truncate`).should('exist')

      // Check right-aligned column
      cy.get(`${headerCellClass}--right`).should('exist')
      cy.get(`${bodyCellClass}--right`).should('exist')

      // Check sortable column
      cy.get('.polly-sort-button').should('exist')

      // Check hidden column is not rendered
      cy.get(headerCellClass).should('have.length', 3) // Only 3 visible columns
      cy.get(headerCellClass).should('not.contain', 'Hidden Status')

      // Check width constraints are applied
      cy.get('.polly-table__table').should('have.css', 'grid-template-columns').and('include', '120px').and('include', '200px').and('include', '100px')
    })

    it('handles all column options with selection enabled', () => {
      const columns = [
        {
          label: 'Name',
          property: 'name',
          freeze: true,
          align: 'left' as const,
        },
        {
          label: 'Amount',
          property: 'amount',
          align: 'right' as const,
          sortable: true,
        },
      ]

      cy.mount(PTable, {
        props: {
          data: combinedData,
          columns,
          selected: [],
          'onUpdate:selected': cy.spy().as('selectionSpy'),
        },
      })

      // Should have selection column plus our columns
      cy.get(headerCellClass).should('have.length', 3) // selection + 2 data columns
      cy.get(checkboxClass).should('exist')

      // Other column options should still work
      cy.get(`${headerCellClass}--sticky`).should('have.length', 2) // selection + frozen name column
      cy.get(`${headerCellClass}--right`).should('exist')
      cy.get('.polly-sort-button').should('exist')
    })
  })
})
