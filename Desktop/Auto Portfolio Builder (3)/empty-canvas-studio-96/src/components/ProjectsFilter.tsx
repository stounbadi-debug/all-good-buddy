import React, { useState, useCallback, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, X, Filter, SlidersHorizontal } from 'lucide-react';

interface ProjectItem {
  title: string;
  year?: string;
  role?: string;
  type?: string;
  rating?: string;
  category?: string;
  status?: 'Completed' | 'In Progress' | 'Upcoming';
  link?: string;
  technologies?: string[];
}

interface ProjectsFilterProps {
  items: ProjectItem[];
  onFilteredItemsChange: (filteredItems: ProjectItem[]) => void;
  placeholder?: string;
}

export const ProjectsFilter: React.FC<ProjectsFilterProps> = ({
  items,
  onFilteredItemsChange,
  placeholder = "Search by title, role, or year..."
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [showFilters, setShowFilters] = useState(false);

  // Extract unique types from items
  const availableTypes = useMemo(() => {
    const types = new Set<string>();
    items.forEach(item => {
      if (item.type) types.add(item.type);
    });
    return Array.from(types).sort();
  }, [items]);

  // Debounced search with filtering and sorting
  const filteredAndSortedItems = useMemo(() => {
    let result = [...items];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.role?.toLowerCase().includes(query) ||
        item.year?.includes(query)
      );
    }

    // Apply type filter
    if (selectedType !== 'all') {
      result = result.filter(item => item.type === selectedType);
    }

    // Apply sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return (parseInt(b.year || '0') - parseInt(a.year || '0'));
        case 'oldest':
          return (parseInt(a.year || '0') - parseInt(b.year || '0'));
        case 'a-z':
          return a.title.localeCompare(b.title);
        case 'z-a':
          return b.title.localeCompare(a.title);
        case 'rating':
          const ratingA = parseFloat(a.rating || '0');
          const ratingB = parseFloat(b.rating || '0');
          return ratingB - ratingA;
        default:
          return 0;
      }
    });

    return result;
  }, [items, searchQuery, selectedType, sortBy]);

  // Update parent component when filters change
  React.useEffect(() => {
    onFilteredItemsChange(filteredAndSortedItems);
  }, [filteredAndSortedItems, onFilteredItemsChange]);

  // Clear all filters
  const handleClearFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedType('all');
    setSortBy('newest');
  }, []);

  const hasActiveFilters = searchQuery.trim() !== '' || selectedType !== 'all' || sortBy !== 'newest';

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder={placeholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-10 h-12 bg-background/50 border-primary/20 focus:border-primary"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <Button
          onClick={() => setShowFilters(!showFilters)}
          variant={showFilters ? "default" : "outline"}
          className="h-12 px-4 sm:w-auto"
        >
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Filters
          {hasActiveFilters && (
            <Badge variant="secondary" className="ml-2 px-1.5 py-0 text-xs">
              {[searchQuery.trim() !== '', selectedType !== 'all', sortBy !== 'newest'].filter(Boolean).length}
            </Badge>
          )}
        </Button>
      </div>

      {/* Advanced Filters (Collapsible) */}
      {showFilters && (
        <div className="animate-scale-in p-4 rounded-xl bg-gradient-to-br from-accent/10 via-accent/5 to-transparent border border-accent/20 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Type Filter */}
            {availableTypes.length > 0 && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filter by Type
                </label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="h-10 bg-background/50 border-primary/20">
                    <SelectValue placeholder="All types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {availableTypes.map(type => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Sort Options */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                Sort By
              </label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="h-10 bg-background/50 border-primary/20">
                  <SelectValue placeholder="Sort by..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="a-z">A to Z</SelectItem>
                  <SelectItem value="z-a">Z to A</SelectItem>
                  {items.some(item => item.rating) && (
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Active Filters & Clear Button */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-accent/20">
            <div className="flex flex-wrap gap-2">
              {searchQuery.trim() && (
                <Badge variant="secondary" className="text-xs">
                  Search: "{searchQuery}"
                </Badge>
              )}
              {selectedType !== 'all' && (
                <Badge variant="secondary" className="text-xs">
                  Type: {selectedType}
                </Badge>
              )}
              {sortBy !== 'newest' && (
                <Badge variant="secondary" className="text-xs">
                  Sort: {sortBy === 'a-z' ? 'A-Z' : sortBy === 'z-a' ? 'Z-A' : sortBy === 'oldest' ? 'Oldest' : sortBy === 'rating' ? 'Rating' : 'Newest'}
                </Badge>
              )}
            </div>

            {hasActiveFilters && (
              <Button
                onClick={handleClearFilters}
                variant="ghost"
                size="sm"
                className="text-xs h-7"
              >
                <X className="h-3 w-3 mr-1" />
                Clear All
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Results Count */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Showing <strong className="text-foreground">{filteredAndSortedItems.length}</strong> of{' '}
          <strong className="text-foreground">{items.length}</strong> {items.length === 1 ? 'item' : 'items'}
        </span>
        {filteredAndSortedItems.length === 0 && items.length > 0 && (
          <span className="text-destructive">No results found</span>
        )}
      </div>
    </div>
  );
};

export default ProjectsFilter;

