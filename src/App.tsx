import { useState } from 'react';
import './App.css';
import { Field, formatQuery, QueryBuilder, RuleGroupType, RuleType } from 'react-querybuilder';
import 'react-querybuilder/dist/query-builder.css';


const fields: Field[] = [
  { name: 'firstName', label: 'First Name' },
  { name: 'lastName', label: 'Last Name' },
  {name: 'phone', label: 'Phone Number',inputType:'number'}
];

const initialQuery: RuleGroupType = { 
  combinator: 'and',
   rules: [
  { field: 'firstName', operator: 'beginsWith', value: 'Daniel' },
  { field: 'lastName', operator: 'in', value: 'Salahi' },
  {field :'phone', operator:'=', value:1664,}
] };

const MAX_NESTING_LEVEL = 2; // Maximum nesting level allowed

const App= () => {

  const [query, setQuery] = useState<RuleGroupType>(initialQuery);
  const handleQueryChange = (q: RuleGroupType) => {
    if (hasExceededNestingLevel(q, MAX_NESTING_LEVEL)) {
      alert("You are not allowed to have more nested groups.");
    } else {
      setQuery(q);
    }
  };

  // const hasExceededNestingLevel = (
  //   group: RuleGroupType | RuleType<string, string, any, string>,
  //   maxLevel: number,
  //   currentLevel = 0
  // ): boolean => {
  //   if (currentLevel > maxLevel) {
  //     return true;
  //   }
  //   if ('rules' in group && group.rules) {
  //     for (const rule of group.rules) {
  //       if (hasExceededNestingLevel(rule, maxLevel, currentLevel + 1)) {
  //         return true;
  //       }
  //     }
  //   }
  //   return false
  // };

//  const hasExceededNestingLevel = (
//     group: RuleGroupType | RuleType<string, string, any, string>,
//     maxLevel: number,
//     currentLevel = 0
//   ): boolean => {
//     if (currentLevel > maxLevel) {
//       return true;
//     }
//     if ('combinator' in group && group.rules) {
//       for (const rule of group.rules) {
//         if (hasExceededNestingLevel(rule, maxLevel, currentLevel + 1)) {
//           return true;
//         }
//       }
//     }
//     return false;
//   };

const hasExceededNestingLevel = (
  group: RuleGroupType,
  maxLevel: number,
  currentLevel = 0
): boolean => {
  if (currentLevel > maxLevel) {
    return true;
  }
  if (group.rules) {
    for (const rule of group.rules) {
      if ('combinator' in rule && rule.rules && hasExceededNestingLevel(rule, maxLevel, currentLevel + 1)) {
        return true;
      }
    }
  }
  return false;
};

const customControlElements = {
  addGroupAction: (props: any) => {
    const { onClick, rules, level } = props;
    const isMaxLevel = level >= MAX_NESTING_LEVEL;
    const disabled = isMaxLevel || hasExceededNestingLevel({
      rules,
      combinator: ''
    }, MAX_NESTING_LEVEL, level);
    return (
      <button onClick={onClick} disabled={disabled}>
        Add Group
      </button>
    );
  }
};


// const customControlElements = {
//   addGroupAction: (props: any) => {
//     const { onClick } = props;
//     const isNestedGroup = props.parentId !== null;
//     const isMaxLevel = hasExceededNestingLevel(query, MAX_NESTING_LEVEL);
//     const disabled = isNestedGroup || isMaxLevel;
//     return (
//       <button onClick={onClick} disabled={disabled}>
//         Add Group
//       </button>
//     );
//   },
//   addRuleAction: (props: any) => {
//     const { onClick } = props;
//     const isNestedGroup = props.parentId !== null;
//     const disabled = isNestedGroup;
//     return (
//       <button onClick={onClick} disabled={disabled}>
//         Add Rule
//       </button>
//     );
//   }
// };

  return (
    <div className="App">
      <QueryBuilder 
      // controlElements={customControlElements}
      controlClassnames={{ addRule: 'bold' }}
      fields={fields} 
      query={query} 
      onQueryChange={handleQueryChange} 
      />
      <h4>
        JSONLogic as result of <code>formatQuery(query, 'jsonlogic')</code>:
      </h4>
      <pre>{JSON.stringify(formatQuery(query, "jsonlogic"), null, 2)}</pre>
      <hr />
    </div>
  );
}

export default App;
