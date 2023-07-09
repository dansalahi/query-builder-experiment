import { useState } from 'react';
import './App.css';
import { Field, formatQuery, QueryBuilder, RuleGroupType } from 'react-querybuilder';
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

const App= () => {

  const [query, setQuery] = useState<RuleGroupType>(initialQuery);

  return (
    <div className="App">
      <QueryBuilder 
      controlClassnames={{ addRule: 'bold' }}
       fields={fields} 
      query={query} 
      onQueryChange={q => setQuery(q)} />
      <h4>
        JSONLogic as result of <code>formatQuery(query, 'jsonlogic')</code>:
      </h4>
      <pre>{JSON.stringify(formatQuery(query, "jsonlogic"), null, 2)}</pre>
    </div>
  );
}

export default App;
